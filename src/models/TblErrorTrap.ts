import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tbl_ErrorTrap", { schema: "dbo" })
export class TblErrorTrap {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "Error_Code", nullable: true })
  errorCode: string | null;

  @Column("datetime", { name: "Error_Time", nullable: true })
  errorTime: Date | null;

  @Column("varchar", { name: "Error_detail", nullable: true, length: 500 })
  errorDetail: string | null;

  @Column("varchar", { name: "Module_Name", nullable: true, length: 500 })
  moduleName: string | null;

  @Column("varchar", { name: "Comments", nullable: true, length: 500 })
  comments: string | null;
}
