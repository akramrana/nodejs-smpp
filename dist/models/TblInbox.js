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
exports.TblInbox = void 0;
const typeorm_1 = require("typeorm");
let TblInbox = class TblInbox {
};
__decorate([
    typeorm_1.Column("uniqueidentifier", {
        primary: true,
        name: "inbox_id",
        default: () => "newid()",
    }),
    __metadata("design:type", String)
], TblInbox.prototype, "inboxId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "telco_msg_id", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblInbox.prototype, "telcoMsgId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "telco_CPshortCode", nullable: true, length: 20 }),
    __metadata("design:type", Object)
], TblInbox.prototype, "telcoCPshortCode", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "telco_inMobileNo", nullable: true, length: 20 }),
    __metadata("design:type", Object)
], TblInbox.prototype, "telcoInMobileNo", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { name: "telco_msgBody", nullable: true, length: 500 }),
    __metadata("design:type", Object)
], TblInbox.prototype, "telcoMsgBody", void 0);
__decorate([
    typeorm_1.Column("int", { name: "telco_msgOption", nullable: true }),
    __metadata("design:type", Object)
], TblInbox.prototype, "telcoMsgOption", void 0);
__decorate([
    typeorm_1.Column("datetime", { name: "telco_SMSCTimeStamp", nullable: true }),
    __metadata("design:type", Object)
], TblInbox.prototype, "telcoSmscTimeStamp", void 0);
__decorate([
    typeorm_1.Column("int", { name: "telco_msgValidity", nullable: true }),
    __metadata("design:type", Object)
], TblInbox.prototype, "telcoMsgValidity", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "app_id", nullable: true, length: 300 }),
    __metadata("design:type", Object)
], TblInbox.prototype, "appId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "app_pocedure_id", nullable: true, length: 300 }),
    __metadata("design:type", Object)
], TblInbox.prototype, "appPocedureId", void 0);
__decorate([
    typeorm_1.Column("datetime", {
        name: "creation_time",
        nullable: true,
        default: () => "getdate()",
    }),
    __metadata("design:type", Object)
], TblInbox.prototype, "creationTime", void 0);
__decorate([
    typeorm_1.Column("int", {
        name: "msg_status",
        nullable: true,
        default: () => "(-128)",
    }),
    __metadata("design:type", Object)
], TblInbox.prototype, "msgStatus", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "comment", nullable: true, length: 300 }),
    __metadata("design:type", Object)
], TblInbox.prototype, "comment", void 0);
__decorate([
    typeorm_1.Column("bigint", { name: "process_performanceTicks", nullable: true }),
    __metadata("design:type", Object)
], TblInbox.prototype, "processPerformanceTicks", void 0);
__decorate([
    typeorm_1.Column("bit", { name: "enabled", nullable: true, default: () => "(1)" }),
    __metadata("design:type", Object)
], TblInbox.prototype, "enabled", void 0);
TblInbox = __decorate([
    typeorm_1.Index("IDX_INBOX", ["msgStatus"], {}),
    typeorm_1.Index("PK_tbl_inbox", ["inboxId"], { unique: true }),
    typeorm_1.Entity("tbl_inbox", { schema: "dbo" })
], TblInbox);
exports.TblInbox = TblInbox;
//# sourceMappingURL=TblInbox.js.map