/// <reference types="multer" />
import { UserRequest } from 'src/common/interfaces/request.interface';
import { AddNewProductDTO, ProductQuery, UpdateProductDTO, UpdateQtyProductDTO } from './product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    addNewProduct(image: Express.Multer.File, addNewProductDto: AddNewProductDTO): Promise<{
        data: () => import("./product.entity").Product;
        message: string;
    }>;
    updateProduct(image: Express.Multer.File, updateProductDto: UpdateProductDTO, id: number): Promise<{
        data: import("./product.entity").Product;
        message: string;
    }>;
    updateQtyProduct(updateQtyProductDto: UpdateQtyProductDTO, id: number, userRequest: UserRequest): Promise<{
        message: string;
    }>;
    addQtyProduct(updateQtyProductDto: UpdateQtyProductDTO, id: number): Promise<{
        data: import("./product.entity").Product;
        message: string;
    }>;
    getAllProduct(productQuery: ProductQuery): Promise<import("nestjs-typeorm-paginate").Pagination<import("./product.entity").Product, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getProduct(id: number): Promise<import("../../../common/interfaces/response.interface").SuccessResponse<import("./product.entity").Product>>;
    deleteProduct(id: number): Promise<import("../../../common/interfaces/server-message.interface").ServerMessage>;
    seeUploadedFile(image: any, res: any): any;
}
