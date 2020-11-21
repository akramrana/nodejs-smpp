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
exports.Sysdiagrams = void 0;
const typeorm_1 = require("typeorm");
let Sysdiagrams = class Sysdiagrams {
};
__decorate([
    typeorm_1.PrimaryColumn("nvarchar", { name: "name", length: 128 }),
    __metadata("design:type", String)
], Sysdiagrams.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("int", { name: "principal_id" }),
    __metadata("design:type", Number)
], Sysdiagrams.prototype, "principalId", void 0);
__decorate([
    typeorm_1.Column("int", { name: "diagram_id" }),
    __metadata("design:type", Number)
], Sysdiagrams.prototype, "diagramId", void 0);
__decorate([
    typeorm_1.Column("int", { name: "version", nullable: true }),
    __metadata("design:type", Object)
], Sysdiagrams.prototype, "version", void 0);
__decorate([
    typeorm_1.Column("varbinary", { name: "definition", nullable: true }),
    __metadata("design:type", Object)
], Sysdiagrams.prototype, "definition", void 0);
Sysdiagrams = __decorate([
    typeorm_1.Entity("sysdiagrams", { schema: "dbo" })
], Sysdiagrams);
exports.Sysdiagrams = Sysdiagrams;
//# sourceMappingURL=Sysdiagrams.js.map