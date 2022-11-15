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
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { create } from 'domain';
import { UpdateDateColumn } from 'typeorm';
import { ProductService } from './product.service';
import {
  AddNewProductDTO,
  ProductQuery,
  UpdateProductDTO,
} from './product.dto';
import { AuthGuard } from '@nestjs/passport';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller({ path: 'product' })
@UseGuards(AuthGuard())
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  addNewProduct(
    @UploadedFile() image: Express.Multer.File,
    @Body() addNewProductDto: AddNewProductDTO,
  ) {
    return this.productService.addNewProduct(addNewProductDto, image);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  updateProduct(
    @UploadedFile() image: Express.Multer.File,
    @Body() updateProductDto: UpdateProductDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productService.updateProduct(id, updateProductDto, image);
  }

  @Get()
  getAllProduct(@Query() productQuery: ProductQuery) {
    return this.productService.getAllProduct(productQuery);
  }

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductById(+id);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProductById(+id);
  }
}
