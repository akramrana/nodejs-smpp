import { Column, Entity, Index } from "typeorm";

@Index("IDX_OUTBOX", ["msgStatus"], {})
@Index("PK_tbl_outbox", ["outboxId"], { unique: true })
@Entity("tbl_outbox", { schema: "dbo" })
export class TblOutbox {
  @Column("uniqueidentifier", {
    primary: true,
    name: "outbox_id",
    default: () => "newid()",
  })
  outboxId: string;

  @Column("uniqueidentifier", { name: "inbox_id", nullable: true })
  inboxId: string | null;

  @Column("varchar", { name: "telco_msg_id", nullable: true, length: 50 })
  telcoMsgId: string | null;

  @Column("varchar", { name: "telco_CPshortCode", nullable: true, length: 20 })
  telcoCPshortCode: string | null;

  @Column("varchar", { name: "telco_toMobileNo", nullable: true, length: 20 })
  telcoToMobileNo: string | null;

  @Column("nvarchar", { name: "telco_msgBody", nullable: true, length: 500 })
  telcoMsgBody: string | null;

  @Column("int", { name: "telco_msgOption", nullable: true })
  telcoMsgOption: number | null;

  @Column("int", { name: "telco_msgValidity", nullable: true })
  telcoMsgValidity: number | null;

  @Column("varchar", { name: "telco_outmsg_id", nullable: true, length: 50 })
  telcoOutmsgId: string | null;

  @Column("bit", {
    name: "is_subscription",
    nullable: true,
    default: () => "(0)",
  })
  isSubscription: boolean | null;

  @Column("varchar", { name: "app_id", nullable: true, length: 300 })
  appId: string | null;

  @Column("varchar", { name: "app_pocedure_id", nullable: true, length: 300 })
  appPocedureId: string | null;

  @Column("int", { name: "keylist_id", nullable: true })
  keylistId: number | null;

  @Column("datetime", {
    name: "creation_time",
    nullable: true,
    default: () => "getdate()",
  })
  creationTime: Date | null;

  @Column("datetime", { name: "delivery_time", nullable: true })
  deliveryTime: Date | null;

  @Column("int", {
    name: "msg_status",
    nullable: true,
    default: () => "(-128)",
  })
  msgStatus: number | null;

  @Column("int", { name: "msg_count_max", nullable: true })
  msgCountMax: number | null;

  @Column("int", { name: "msg_count", nullable: true })
  msgCount: number | null;

  @Column("int", { name: "charge_id", nullable: true })
  chargeId: number | null;

  @Column("varchar", { name: "comment", nullable: true, length: 300 })
  comment: string | null;

  @Column("bigint", { name: "process_performanceTicks", nullable: true })
  processPerformanceTicks: string | null;

  @Column("bit", { name: "enabled", nullable: true, default: () => "(1)" })
  enabled: boolean | null;
}
