import { Column, Entity, Index } from "typeorm";

@Index("IDX_INBOXPOST", ["msgStatus"], {})
@Index("PK_tbl_inboxPost", ["inboxPostId"], { unique: true })
@Entity("tbl_inboxPost", { schema: "dbo" })
export class TblInboxPost {
  @Column("uniqueidentifier", {
    primary: true,
    name: "inboxPost_id",
    default: () => "newid()",
  })
  inboxPostId: string;

  @Column("uniqueidentifier", { name: "inbox_id", nullable: true })
  inboxId: string | null;

  @Column("varchar", { name: "telco_msg_id", nullable: true, length: 50 })
  telcoMsgId: string | null;

  @Column("varchar", { name: "telco_CPshortCode", nullable: true, length: 20 })
  telcoCPshortCode: string | null;

  @Column("varchar", { name: "telco_inMobileNo", nullable: true, length: 20 })
  telcoInMobileNo: string | null;

  @Column("nvarchar", { name: "telco_msgBody", nullable: true, length: 500 })
  telcoMsgBody: string | null;

  @Column("int", { name: "telco_msgOption", nullable: true })
  telcoMsgOption: number | null;

  @Column("datetime", { name: "telco_SMSCTimeStamp", nullable: true })
  telcoSmscTimeStamp: Date | null;

  @Column("int", { name: "telco_msgValidity", nullable: true })
  telcoMsgValidity: number | null;

  @Column("nvarchar", { name: "msg_keyword", nullable: true, length: 400 })
  msgKeyword: string | null;

  @Column("nvarchar", { name: "msg_parameter_1", nullable: true, length: 160 })
  msgParameter_1: string | null;

  @Column("nvarchar", { name: "msg_parameter_2", nullable: true, length: 160 })
  msgParameter_2: string | null;

  @Column("nvarchar", { name: "msg_parameter_3", nullable: true, length: 160 })
  msgParameter_3: string | null;

  @Column("varchar", { name: "app_id", nullable: true, length: 300 })
  appId: string | null;

  @Column("varchar", { name: "app_pocedure_id", nullable: true, length: 300 })
  appPocedureId: string | null;

  @Column("datetime", {
    name: "creation_time",
    nullable: true,
    default: () => "getdate()",
  })
  creationTime: Date | null;

  @Column("int", {
    name: "msg_status",
    nullable: true,
    default: () => "(-128)",
  })
  msgStatus: number | null;

  @Column("varchar", { name: "comment", nullable: true, length: 300 })
  comment: string | null;

  @Column("bigint", { name: "process_performanceTicks", nullable: true })
  processPerformanceTicks: string | null;

  @Column("bit", { name: "enabled", nullable: true, default: () => "(1)" })
  enabled: boolean | null;
}
