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
exports.Pass = void 0;
const typeorm_1 = require("typeorm");
let Pass = class Pass {
};
__decorate([
    typeorm_1.PrimaryColumn("nvarchar", { name: "user_name", length: 50 }),
    __metadata("design:type", Object)
], Pass.prototype, "userName", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { name: "password", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Pass.prototype, "password", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { name: "bk_name", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Pass.prototype, "bkName", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { name: "bk_pass", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Pass.prototype, "bkPass", void 0);
__decorate([
    typeorm_1.Column("bit", { name: "enabled", nullable: true }),
    __metadata("design:type", Object)
], Pass.prototype, "enabled", void 0);
Pass = __decorate([
    typeorm_1.Entity("pass", { schema: "dbo" })
], Pass);
exports.Pass = Pass;
//# sourceMappingURL=Pass.js.map