import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  isArray,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PaginationQuery } from 'src/common/core/pagination.query';
import { CreateHistoryDetailDTO } from '../history-detail/history-detail.dto';

export class CreateHistoryDTO {
  @IsOptional()
  @IsString()
  note: string;

  @IsOptional()
  @IsString()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHistoryDetailDTO)
  @ArrayMinSize(1)
  historyDetail: CreateHistoryDetailDTO[];
}
export class GetHistoryDTO {
  @IsOptional()
  @IsString()
  note: string;

  @IsOptional()
  @IsString()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHistoryDetailDTO)
  @ArrayMinSize(1)
  historyDetail: CreateHistoryDetailDTO[];
}