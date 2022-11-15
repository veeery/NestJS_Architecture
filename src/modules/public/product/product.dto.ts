import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
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

  @IsOptional()
  @IsString()
  image: string;
}

export class UpdateProductDTO extends BaseProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  unit: string;

  @IsOptional()
  @IsString()
  image: string;
}



export class ProductQuery extends PaginationQuery {}
