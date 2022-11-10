import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  ParseIntPipe,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { create } from 'domain';
import { UpdateDateColumn } from 'typeorm';
import { ProductService } from './product.service';
import { ProductDTO } from './product.dto';

@Controller({ path: 'product' })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  addNewProduct(@Body() addNewProductDto: ProductDTO) {
    return this.productService.addNewProduct(addNewProductDto);
  }
}
