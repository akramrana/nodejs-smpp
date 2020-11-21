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
exports.TblKpiWhiteList = void 0;
const typeorm_1 = require("typeorm");
let TblKpiWhiteList = class TblKpiWhiteList {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "white_list_id" }),
    __metadata("design:type", Number)
], TblKpiWhiteList.prototype, "whiteListId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "telco_mobile_number", length: 20 }),
    __metadata("design:type", String)
], TblKpiWhiteList.prototype, "telcoMobileNumber", void 0);
__decorate([
    typeorm_1.Column("int", { name: "status", default: () => "(1)" }),
    __metadata("design:type", Number)
], TblKpiWhiteList.prototype, "status", void 0);
TblKpiWhiteList = __decorate([
    typeorm_1.Entity("tbl_kpi_white_list", { schema: "dbo" })
], TblKpiWhiteList);
exports.TblKpiWhiteList = TblKpiWhiteList;
//# sourceMappingURL=TblKpiWhiteList.js.map