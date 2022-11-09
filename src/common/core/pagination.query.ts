import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ToNumber } from '../decorators/transforms/to-number';
import { ToUpperCase } from '../decorators/transforms/to-upper-case';
import { SortBy } from '../enum/sort-by.enum';

export class PaginationQuery {
  @IsOptional()
  @IsNumber()
  @ToNumber()
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @ToNumber()
  limit: number = 10;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  orderBy: string;

  @IsOptional()
  @IsEnum(SortBy)
  @ToUpperCase()
  sortBy: SortBy;
}
