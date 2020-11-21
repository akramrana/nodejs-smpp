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
exports.TblOutbox = void 0;
const typeorm_1 = require("typeorm");
let TblOutbox = class TblOutbox {
};
__decorate([
    typeorm_1.Column("uniqueidentifier", {
        primary: true,
        name: "outbox_id",
        default: () => "newid()",
    }),
    __metadata("design:type", String)
], TblOutbox.prototype, "outboxId", void 0);
__decorate([
    typeorm_1.Column("uniqueidentifier", { name: "inbox_id", nullable: true }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "inboxId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "telco_msg_id", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "telcoMsgId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "telco_CPshortCode", nullable: true, length: 20 }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "telcoCPshortCode", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "telco_toMobileNo", nullable: true, length: 20 }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "telcoToMobileNo", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { name: "telco_msgBody", nullable: true, length: 500 }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "telcoMsgBody", void 0);
__decorate([
    typeorm_1.Column("int", { name: "telco_msgOption", nullable: true }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "telcoMsgOption", void 0);
__decorate([
    typeorm_1.Column("int", { name: "telco_msgValidity", nullable: true }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "telcoMsgValidity", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "telco_outmsg_id", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "telcoOutmsgId", void 0);
__decorate([
    typeorm_1.Column("bit", {
        name: "is_subscription",
        nullable: true,
        default: () => "(0)",
    }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "isSubscription", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "app_id", nullable: true, length: 300 }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "appId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "app_pocedure_id", nullable: true, length: 300 }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "appPocedureId", void 0);
__decorate([
    typeorm_1.Column("int", { name: "keylist_id", nullable: true }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "keylistId", void 0);
__decorate([
    typeorm_1.Column("datetime", {
        name: "creation_time",
        nullable: true,
        default: () => "getdate()",
    }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "creationTime", void 0);
__decorate([
    typeorm_1.Column("datetime", { name: "delivery_time", nullable: true }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "deliveryTime", void 0);
__decorate([
    typeorm_1.Column("int", {
        name: "msg_status",
        nullable: true,
        default: () => "(-128)",
    }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "msgStatus", void 0);
__decorate([
    typeorm_1.Column("int", { name: "msg_count_max", nullable: true }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "msgCountMax", void 0);
__decorate([
    typeorm_1.Column("int", { name: "msg_count", nullable: true }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "msgCount", void 0);
__decorate([
    typeorm_1.Column("int", { name: "charge_id", nullable: true }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "chargeId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "comment", nullable: true, length: 300 }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "comment", void 0);
__decorate([
    typeorm_1.Column("bigint", { name: "process_performanceTicks", nullable: true }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "processPerformanceTicks", void 0);
__decorate([
    typeorm_1.Column("bit", { name: "enabled", nullable: true, default: () => "(1)" }),
    __metadata("design:type", Object)
], TblOutbox.prototype, "enabled", void 0);
TblOutbox = __decorate([
    typeorm_1.Index("IDX_OUTBOX", ["msgStatus"], {}),
    typeorm_1.Index("PK_tbl_outbox", ["outboxId"], { unique: true }),
    typeorm_1.Entity("tbl_outbox", { schema: "dbo" })
], TblOutbox);
exports.TblOutbox = TblOutbox;
//# sourceMappingURL=TblOutbox.js.map