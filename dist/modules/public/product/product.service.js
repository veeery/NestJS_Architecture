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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const validation_exception_1 = require("../../../common/exceptions/validation-exception");
const auto_folder_1 = require("../../../common/utils/auto_folder");
const orm_1 = require("../../../common/utils/orm");
const product_entity_1 = require("./product.entity");
const typeorm_2 = require("typeorm");
const history_service_1 = require("../history/history.service");
let ProductService = class ProductService {
    constructor(productRepository, historyService) {
        this.productRepository = productRepository;
        this.historyService = historyService;
    }
    async uploadSingleImage(image) {
        if (!image)
            throw new common_1.BadRequestException();
        return image;
    }
    async addNewProduct(addNewProduct, image) {
        try {
            const product = this.productRepository.create(addNewProduct);
            if (image) {
                const imageName = `${Date.now()}-${image.originalname}`;
                product.image = `product/image/${imageName}`;
                (0, auto_folder_1.uploadImage)(image, imageName);
            }
            const returnData = (await product.save()).toJson;
            return {
                data: returnData,
                message: 'Successfully Add New Product',
            };
        }
        catch (err) {
            if (err.code == 'ER_DUP_ENTRY')
                throw new validation_exception_1.ValidationErrorException({
                    code: ['Product already in'],
                });
            throw err;
        }
    }
    async getProductById(id) {
        let product = await this.productRepository.findOne({
            where: { id },
            relations: {},
        });
        if (!product) {
            product = await this.getProductByScanCode(id.toString());
        }
        return { data: product };
    }
    async getProductByScanCode(scanCode) {
        const product = await this.productRepository.findOne({
            where: { scanCode },
            relations: {},
        });
        if (!product)
            throw new common_1.NotFoundException('Product Not Found');
        return product;
    }
    async getAllProduct(productQuery) {
        const { limit, page, search, orderBy, sortBy } = productQuery;
        const query = this.productRepository.createQueryBuilder('product');
        if (search)
            query.where((0, orm_1.like)('product.name', search));
        if (orderBy && sortBy)
            query.orderBy(`product.${orderBy}`, sortBy);
        const paginated = (0, nestjs_typeorm_paginate_1.paginate)(query, { limit, page });
        (await paginated).items.forEach((product) => product.toJson());
        return paginated;
    }
    async deleteProductById(id) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: {},
        });
        if (!product) {
            return await this.deleteProductByScanCode(id.toString());
        }
        try {
            await product.remove();
        }
        catch (err) {
            await product.softRemove();
        }
        return { message: 'Product Successfully Delete' };
    }
    async deleteProductByScanCode(scanCode) {
        const product = await this.productRepository.findOne({
            where: { scanCode },
            relations: {},
        });
        if (!product)
            throw new common_1.NotFoundException('Product Not Found');
        try {
            await product.remove();
        }
        catch (err) {
            await product.softRemove();
        }
        return { message: 'Product Successfully Delete' };
    }
    async updateProduct(id, updateProductDto, image) {
        let product = await this.productRepository.findOne({
            where: { id },
            relations: {},
        });
        if (!product) {
            product = await this.getProductByScanCode(id.toString());
        }
        let ImageUpdate;
        if (image) {
            ImageUpdate = `${product.image.split('/')[2]}`;
            product.image = `product/image/${ImageUpdate}`;
        }
        const updateProduct = this.productRepository.create(Object.assign(Object.assign({}, product), updateProductDto));
        try {
            const returnDataUpdated = (await updateProduct.save()).toJson();
            if (image) {
                (0, auto_folder_1.uploadImage)(image, ImageUpdate);
            }
            return {
                data: returnDataUpdated,
                message: 'Succesfully Update Product',
            };
        }
        catch (err) {
            throw err;
        }
    }
    async scanQtyProduct(id, updateQtyProductDto, userRequest) {
        let product = await this.productRepository.findOne({
            where: { id },
            relations: {},
        });
        if (!product) {
            product = await this.getProductByScanCode(id.toString());
        }
        const historyDetail = {
            note: '',
            userId: null,
            historyDetail: [
                {
                    productId: product.id,
                    qty: updateQtyProductDto.qty,
                },
            ],
        };
        const createSuccess = await this.historyService.createHistory(historyDetail, userRequest);
        if (!createSuccess) {
            throw new common_1.BadRequestException('Qty Product Not Enough');
        }
        await product.save();
        return {
            message: 'Successfully Update Qty Product',
        };
    }
    async addQtyProduct(id, updateQtyProductDto) {
        let product = await this.productRepository.findOne({
            where: { id },
            relations: {},
        });
        if (!product) {
            product = await this.getProductByScanCode(id.toString());
        }
        product.qty += updateQtyProductDto.qty;
        const returnDataQtyUpdate = (await product.save()).toJson();
        return {
            data: returnDataQtyUpdate,
            message: 'Successfully Add Qty Product',
        };
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        history_service_1.HistoryService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map