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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryQuery = exports.GetHistoryDTO = exports.CreateHistoryDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const pagination_query_1 = require("../../../common/core/pagination.query");
const history_detail_dto_1 = require("../history-detail/history-detail.dto");
class CreateHistoryDTO {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHistoryDTO.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], CreateHistoryDTO.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => history_detail_dto_1.CreateHistoryDetailDTO),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], CreateHistoryDTO.prototype, "historyDetail", void 0);
exports.CreateHistoryDTO = CreateHistoryDTO;
class GetHistoryDTO {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetHistoryDTO.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], GetHistoryDTO.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => history_detail_dto_1.CreateHistoryDetailDTO),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], GetHistoryDTO.prototype, "historyDetail", void 0);
exports.GetHistoryDTO = GetHistoryDTO;
class HistoryQuery extends pagination_query_1.PaginationQuery {
}
exports.HistoryQuery = HistoryQuery;
//# sourceMappingURL=history.dto.js.map