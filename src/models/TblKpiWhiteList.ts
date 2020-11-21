import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tbl_kpi_white_list", { schema: "dbo" })
export class TblKpiWhiteList {
  @PrimaryGeneratedColumn({ type: "int", name: "white_list_id" })
  whiteListId: number;

  @Column("varchar", { name: "telco_mobile_number", length: 20 })
  telcoMobileNumber: string;

  @Column("int", { name: "status", default: () => "(1)" })
  status: number;
}
