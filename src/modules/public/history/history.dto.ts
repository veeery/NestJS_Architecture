import {
  isArray,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PaginationQuery } from 'src/common/core/pagination.query';

export class CreateHistoryDTO {
  @IsOptional()
  @IsString()
  note: string;

  @IsOptional()
  @IsString()
  userId: number;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  productIds: number[];
}
