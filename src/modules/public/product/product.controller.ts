import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserRequest } from 'src/common/interfaces/request.interface';
import {
  AddNewProductDTO,
  ProductQuery,
  UpdateProductDTO,
  UpdateQtyProductDTO,
} from './product.dto';
import { ProductService } from './product.service';

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

  @Patch('product/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateProduct(
    @UploadedFile() image: Express.Multer.File,
    @Body() updateProductDto: UpdateProductDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productService.updateProduct(id, updateProductDto, image);
  }

  @Patch('scan-product/:id')
  updateQtyProduct(
    @Body() updateQtyProductDto: UpdateQtyProductDTO,
    @Param('id', ParseIntPipe) id: number,
    @Req() userRequest: UserRequest,
  ) {
    return this.productService.scanQtyProduct(
      id,
      updateQtyProductDto,
      userRequest,
    );
  }

  @Patch('add-product/:id')
  addQtyProduct(
    @Body() updateQtyProductDto: UpdateQtyProductDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productService.addQtyProduct(id, updateQtyProductDto);
  }

  @Get('product')
  getAllProduct(@Query() productQuery: ProductQuery) {
    return this.productService.getAllProduct(productQuery);
  }

  @Get('product/:id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductById(+id);
  }

  @Delete('product/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProductById(+id);
  }

  @Get('/image/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
}
