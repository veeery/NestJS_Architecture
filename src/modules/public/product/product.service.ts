import { Injectable, NotFoundException } from '@nestjs/common';
import { SuccessResponse } from 'src/common/interfaces/response.interface';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationErrorException } from 'src/common/exceptions/validation-exception';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { like } from 'src/common/utils/orm';
import { Product } from 'src/modules/public/product/product.entity';
import { ProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async addNewProduct(addNewProduct: ProductDTO) {
    const product = this.productRepository.create(addNewProduct);

    try {
      return {
        data: (await product.save()).toJson,
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
}
