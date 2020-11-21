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
exports.TblInboxPost = void 0;
const typeorm_1 = require("typeorm");
let TblInboxPost = class TblInboxPost {
};
__decorate([
    typeorm_1.Column("uniqueidentifier", {
        primary: true,
        name: "inboxPost_id",
        default: () => "newid()",
    }),
    __metadata("design:type", String)
], TblInboxPost.prototype, "inboxPostId", void 0);
__decorate([
    typeorm_1.Column("uniqueidentifier", { name: "inbox_id", nullable: true }),
    __metadata("design:type", Object)
], TblInboxPost.prototype, "inboxId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "telco_msg_id", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblInboxPost.prototype, "telcoMsgId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "telco_CPshortCode", nullable: true, length: 20 }),
    __metadata("design:type", Object)
], TblInboxPost.prototype, "telcoCPshortCode", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "telco_inMobileNo", nullable: true, length: 20 }),
    __metadata("design:type", Object)
], TblInboxPost.prototype, "telcoInMobileNo", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { name: "telco_msgBody", nullable: true, length: 500 }),
    __metadata("design:type", Object)
], TblInboxPost.prototype, "telcoMsgBody", void 0);
__decorate([
    typeorm_1.Column("int", { name: "telco_msgOption", nullable: true }),
    __metadata("design:type", Object)
], TblInboxPost.prototype, "telcoMsgOption", void 0);
__decorate([
    typeorm_1.Column("datetime", { name: "telco_SMSCTimeStamp", nullable: true }),
    __metadata("design:type", Object)
], TblInboxPost.prototype, "telcoSmscTimeStamp", void 0);
__decorate([
    typeorm_1.Column("int", { name: "telco_msgValidity", nullable: true }),
    __metadata("design:type", Object)
], TblInboxPost.prototype, "telcoMsgValidity", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { name: "msg_keyword", nullable: true, length: 400 }),
    __metadata("design:type", Object)
], TblInboxPost.prototype, "msgKeyword", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { name: "msg_parameter_1", nullable: true, length: 160 }),
    __metadata("design:type", Object)
], TblInboxPost.prototype, "msgParameter_1", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { name: "msg_parameter_2", nullable: true, length: 160 }),
    __metadata("design:type", Object)
], TblInboxPost.prototype, "msgParameter_2", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { name: "msg_parameter_3", nullable: true, length: 160 }),
    __metadata("design:type", Object)
], TblInboxPost.prototype, "msgParameter_3", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "app_id", nullable: true, length: 300 }),
    __metadata("design:type", Object)
], TblInboxPost.prototype, "appId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "app_pocedure_id", nullable: true, length: 300 }),
    __metadata("design:type", Object)
], TblInboxPost.prototype, "appPocedureId", void 0);
__decorate([
    typeorm_1.Column("datetime", {
        name: "creation_time",
        nullable: true,
        default: () => "getdate()",
    }),
    __metadata("design:type", Object)
], TblInboxPost.prototype, "creationTime", void 0);
__decorate([
    typeorm_1.Column("int", {
        name: "msg_status",
        nullable: true,
        default: () => "(-128)",
    }),
    __metadata("design:type", Object)
], TblInboxPost.prototype, "msgStatus", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "comment", nullable: true, length: 300 }),
    __metadata("design:type", Object)
], TblInboxPost.prototype, "comment", void 0);
__decorate([
    typeorm_1.Column("bigint", { name: "process_performanceTicks", nullable: true }),
    __metadata("design:type", Object)
], TblInboxPost.prototype, "processPerformanceTicks", void 0);
__decorate([
    typeorm_1.Column("bit", { name: "enabled", nullable: true, default: () => "(1)" }),
    __metadata("design:type", Object)
], TblInboxPost.prototype, "enabled", void 0);
TblInboxPost = __decorate([
    typeorm_1.Index("IDX_INBOXPOST", ["msgStatus"], {}),
    typeorm_1.Index("PK_tbl_inboxPost", ["inboxPostId"], { unique: true }),
    typeorm_1.Entity("tbl_inboxPost", { schema: "dbo" })
], TblInboxPost);
exports.TblInboxPost = TblInboxPost;
//# sourceMappingURL=TblInboxPost.js.map