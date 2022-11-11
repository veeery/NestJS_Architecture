import { IsNotEmpty, IsString } from 'class-validator';
import { PaginationQuery } from 'src/common/core/pagination.query';

export class BaseProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class AddNewProductDTO extends BaseProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  scanCode: string;

  @IsNotEmpty()
  @IsString()
  unit: string;
}

export class ProductQuery extends PaginationQuery {}
