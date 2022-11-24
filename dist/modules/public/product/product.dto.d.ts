import { PaginationQuery } from 'src/common/core/pagination.query';
export declare class BaseProductDto {
    name: string;
}
export declare class AddNewProductDTO extends BaseProductDto {
    name: string;
    scanCode: string;
    unit: string;
    imageUrl: string;
}
export declare class UpdateProductDTO extends BaseProductDto {
    name: string;
    unit: string;
}
export declare class UpdateQtyProductDTO {
    qty: number;
}
export declare class ProductQuery extends PaginationQuery {
}
