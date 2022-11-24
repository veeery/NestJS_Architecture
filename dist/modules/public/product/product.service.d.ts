/// <reference types="multer" />
import { Pagination } from 'nestjs-typeorm-paginate';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { SuccessResponse } from 'src/common/interfaces/response.interface';
import { ServerMessage } from 'src/common/interfaces/server-message.interface';
import { Product } from 'src/modules/public/product/product.entity';
import { Repository } from 'typeorm';
import { HistoryService } from '../history/history.service';
import { AddNewProductDTO, ProductQuery, UpdateProductDTO, UpdateQtyProductDTO } from './product.dto';
export declare class ProductService {
    private productRepository;
    private historyService;
    constructor(productRepository: Repository<Product>, historyService: HistoryService);
    uploadSingleImage(image: Express.Multer.File): Promise<Express.Multer.File>;
    addNewProduct(addNewProduct: AddNewProductDTO, image: Express.Multer.File): Promise<{
        data: () => Product;
        message: string;
    }>;
    getProductById(id: number): Promise<SuccessResponse<Product>>;
    getProductByScanCode(scanCode: string): Promise<Product>;
    getAllProduct(productQuery: ProductQuery): Promise<Pagination<Product>>;
    deleteProductById(id: number): Promise<ServerMessage>;
    deleteProductByScanCode(scanCode: string): Promise<ServerMessage>;
    updateProduct(id: number, updateProductDto: UpdateProductDTO, image: Express.Multer.File): Promise<{
        data: Product;
        message: string;
    }>;
    scanQtyProduct(id: number, updateQtyProductDto: UpdateQtyProductDTO, userRequest: UserRequest): Promise<{
        message: string;
    }>;
    addQtyProduct(id: number, updateQtyProductDto: UpdateQtyProductDTO): Promise<{
        data: Product;
        message: string;
    }>;
}
