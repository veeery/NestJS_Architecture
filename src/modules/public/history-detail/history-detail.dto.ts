import {
  isArray,
  IsArray,
  IsNotEmpty,
  isNumber,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PaginationQuery } from 'src/common/core/pagination.query';

export class CreateHistoryDetailDTO {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  qty: number = 0;


}
