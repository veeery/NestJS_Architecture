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
exports.HistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const orm_1 = require("../../../common/utils/orm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../product/product.entity");
const user_entity_1 = require("../user/user.entity");
const history_entity_1 = require("./history.entity");
let HistoryService = class HistoryService {
    constructor(historyRepository, productRepository, userRepository) {
        this.historyRepository = historyRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }
    async createHistory(addHistory, userRequest) {
        const history = this.historyRepository.create(addHistory);
        history.userId = userRequest.user.id;
        const applySuccess = await this.applyProductDetail(history);
        if (!applySuccess) {
            return false;
        }
        try {
            history.save();
            return true;
        }
        catch (err) {
            throw new common_1.BadRequestException();
        }
    }
    async getHistory(historyId) {
        const history = await this.historyRepository.findOne({
            where: { id: historyId },
            relations: {
                historyDetail: {
                    product: true,
                },
            },
        });
        return { data: history };
    }
    async getHistoryByUser(historyQuery, userRequest) {
        const { limit, page, search, orderBy, sortBy } = historyQuery;
        const query = this.historyRepository.createQueryBuilder('history');
        query.where((0, orm_1.equal)('history.userId', userRequest.user.id));
        query.leftJoinAndSelect('history.historyDetail', 'historyDetail');
        query.orderBy(`history.createdAt`, 'DESC');
        const paginated = (0, nestjs_typeorm_paginate_1.paginate)(query, { limit, page });
        return paginated;
    }
    async getAllHistory(historyQuery) {
        const { limit, page, search, orderBy, sortBy } = historyQuery;
        const query = this.historyRepository.createQueryBuilder('history');
        query.leftJoinAndSelect('history.historyDetail', 'historyDetail');
        query.orderBy(`history.createdAt`, 'DESC');
        const paginated = (0, nestjs_typeorm_paginate_1.paginate)(query, { limit, page });
        return paginated;
    }
    async applyProductDetail(history) {
        const productIds = [];
        for (const historyDetail of history.historyDetail) {
            const product = await this.productRepository.findOne({
                where: {
                    id: historyDetail.productId,
                },
            });
            if (product) {
                productIds.push(historyDetail.productId);
            }
            if (!product) {
                throw new common_1.BadRequestException('Ada id Produk yang salah.');
            }
        }
        const products = await this.productRepository.findBy({
            id: (0, typeorm_2.In)(productIds),
        });
        for (const historyDetail of history.historyDetail) {
            const product = products.find((product) => product.id == historyDetail.productId);
            if (product.qty < historyDetail.qty) {
                return false;
            }
            product.qty -= historyDetail.qty;
            try {
                await product.save();
            }
            catch (err) {
                throw err;
            }
        }
        return true;
    }
};
HistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(history_entity_1.History)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], HistoryService);
exports.HistoryService = HistoryService;
//# sourceMappingURL=history.service.js.map