import { Model } from 'src/common/core/model';
export declare class Product extends Model {
    name: string;
    scanCode: string;
    qty: number;
    unit: string;
    image: string;
    toJson(): this;
}
