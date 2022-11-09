import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PaginationQuery } from 'src/common/core/pagination.query';

export class BaseUserDto {
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3)
  @IsString()
  name: string;
}

export class CreateUserDTO extends BaseUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(3)
  @IsString()
  username: string;

  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(6)
  @IsString()
  password: string;

  @IsOptional()
  @IsArray()
  @IsString()
  address: string[];
}

export class UserQuery extends PaginationQuery {}
