import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { ValidationErrorException } from 'src/common/exceptions/validation-exception';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { SuccessResponse } from 'src/common/interfaces/response.interface';
import { ServerMessage } from 'src/common/interfaces/server-message.interface';
import { uploadImage } from 'src/common/utils/auto_folder';
import { like } from 'src/common/utils/orm';
import { Product } from 'src/modules/public/product/product.entity';
import { Repository } from 'typeorm';
import { CreateHistoryDetailDTO } from '../history-detail/history-detail.dto';
import { CreateHistoryDTO } from '../history/history.dto';
import { HistoryService } from '../history/history.service';
import {
  AddNewProductDTO,
  ProductQuery,
  UpdateProductDTO,
  UpdateQtyProductDTO,
} from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private historyService: HistoryService,
  ) {}

  async uploadSingleImage(image: Express.Multer.File) {
    if (!image) throw new BadRequestException();
    return image;
  }

  async addNewProduct(
    addNewProduct: AddNewProductDTO,
    image: Express.Multer.File,
  ) {
    const product = this.productRepository.create(addNewProduct);
    const imageName = `${Date.now()}-${image.originalname}`;
    product.image = `product/image/${imageName}`;

    try {
      const returnData = (await product.save()).toJson;
      uploadImage(image, imageName);

      return {
        data: returnData,
        message: 'Successfully Add New Product',
      };
    } catch (err) {
      if (err.code == 'ER_DUP_ENTRY')
        throw new ValidationErrorException({
          code: ['Product already in'],
        });
      throw err;
    }
  }

  async getProductById(id: number): Promise<SuccessResponse<Product>> {
    let product = await this.productRepository.findOne({
      where: { id },
      relations: {},
    });
    if (!product) {
      product = await this.getProductByScanCode(id.toString());
    }
    return { data: product };
  }

  async getProductByScanCode(scanCode: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { scanCode },
      relations: {},
    });
    if (!product) throw new NotFoundException('Product Not Found');
    return product;
  }

  async getAllProduct(
    productQuery: ProductQuery,
  ): Promise<Pagination<Product>> {
    const { limit, page, search, orderBy, sortBy } = productQuery;
    const query = this.productRepository.createQueryBuilder('product');

    if (search) query.where(like('product.name', search));

    if (orderBy && sortBy) query.orderBy(`product.${orderBy}`, sortBy);

    const paginated = paginate<Product>(query, { limit, page });
    (await paginated).items.forEach((product) => product.toJson());
    return paginated;
  }

  async deleteProductById(id: number): Promise<ServerMessage> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {},
    });

    if (!product) {
      return await this.deleteProductByScanCode(id.toString());
    }

    try {
      await product.remove();
    } catch (err) {
      await product.softRemove();
    }

    return { message: 'Product Successfully Delete' };
  }

  async deleteProductByScanCode(scanCode: string): Promise<ServerMessage> {
    const product = await this.productRepository.findOne({
      where: { scanCode },
      relations: {},
    });

    if (!product) throw new NotFoundException('Product Not Found');

    try {
      await product.remove();
    } catch (err) {
      await product.softRemove();
    }

    return { message: 'Product Successfully Delete' };
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDTO,
    image: Express.Multer.File,
  ) {
    let product = await this.productRepository.findOne({
      where: { id },
      relations: {},
    });

    if (!product) {
      product = await this.getProductByScanCode(id.toString());
    }

    let ImageUpdate: string;

    if (image) {
      ImageUpdate = `${product.image.split('/')[2]}`;
      product.image = `product/image/${ImageUpdate}`;
    }

    const updateProduct = this.productRepository.create({
      ...product,
      ...updateProductDto,
    });

    try {
      const returnDataUpdated = (await updateProduct.save()).toJson();
      if (image) {
        uploadImage(image, ImageUpdate);
      }

      return {
        data: returnDataUpdated,
        message: 'Succesfully Update Product',
      };
    } catch (err) {
      throw err;
    }
  }

  async scanQtyProduct(
    id: number,
    updateQtyProductDto: UpdateQtyProductDTO,
    userRequest: UserRequest,
  ) {
    let product = await this.productRepository.findOne({
      where: { id },
      relations: {},
    });

    if (!product) {
      product = await this.getProductByScanCode(id.toString());
    }

    const historyDetail: CreateHistoryDTO = {
      note: '',
      userId: null,
      historyDetail: [
        {
          productId: product.id,
          qty: updateQtyProductDto.qty,
        },
      ],
    };

    const createSuccess = await this.historyService.createHistory(
      historyDetail,
      userRequest,
    );

    if (!createSuccess) {
      throw new BadRequestException('Qty Product Not Enough');
    }

    await product.save();

    return {
      message: 'Successfully Update Qty Product',
    };
  }

  async addQtyProduct(id: number, updateQtyProductDto: UpdateQtyProductDTO) {
    let product = await this.productRepository.findOne({
      where: { id },
      relations: {},
    });

    if (!product) {
      product = await this.getProductByScanCode(id.toString());
    }

    product.qty += updateQtyProductDto.qty;

    const returnDataQtyUpdate = (await product.save()).toJson();

    return {
      data: returnDataQtyUpdate,
      message: 'Successfully Add Qty Product',
    };
  }
}
