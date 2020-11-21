import { Column, Entity, PrimaryColumn} from "typeorm";

@Entity("pass", { schema: "dbo" })
export class Pass {
  @PrimaryColumn("nvarchar", { name: "user_name", length: 50 })
  userName: string | null;

  @Column("nvarchar", { name: "password", nullable: true, length: 50 })
  password: string | null;

  @Column("nvarchar", { name: "bk_name", nullable: true, length: 50 })
  bkName: string | null;

  @Column("nvarchar", { name: "bk_pass", nullable: true, length: 50 })
  bkPass: string | null;

  @Column("bit", { name: "enabled", nullable: true })
  enabled: boolean | null;
} 
