"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const product_dto_1 = require("./product.dto");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    addNewProduct(image, addNewProductDto) {
        return this.productService.addNewProduct(addNewProductDto, image);
    }
    updateProduct(image, updateProductDto, id) {
        return this.productService.updateProduct(id, updateProductDto, image);
    }
    updateQtyProduct(updateQtyProductDto, id, userRequest) {
        return this.productService.scanQtyProduct(id, updateQtyProductDto, userRequest);
    }
    addQtyProduct(updateQtyProductDto, id) {
        return this.productService.addQtyProduct(id, updateQtyProductDto);
    }
    getAllProduct(productQuery) {
        return this.productService.getAllProduct(productQuery);
    }
    getProduct(id) {
        return this.productService.getProductById(+id);
    }
    deleteProduct(id) {
        return this.productService.deleteProductById(+id);
    }
    seeUploadedFile(image, res) {
        return res.sendFile(image, { root: './files' });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, product_dto_1.AddNewProductDTO]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "addNewProduct", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, product_dto_1.UpdateProductDTO, Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Patch)(':id/scan-product'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.UpdateQtyProductDTO, Number, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "updateQtyProduct", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Patch)(':id/add-product'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.UpdateQtyProductDTO, Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "addQtyProduct", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductQuery]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getAllProduct", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Get)('/image/:imgpath'),
    __param(0, (0, common_1.Param)('imgpath')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "seeUploadedFile", null);
ProductController = __decorate([
    (0, common_1.Controller)({ path: 'product' }),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map