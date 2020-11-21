import { Column, Entity, PrimaryColumn} from "typeorm";

@Entity("sysdiagrams", { schema: "dbo" })
export class Sysdiagrams {
  @PrimaryColumn("nvarchar", { name: "name", length: 128 })
  name: string;

  @Column("int", { name: "principal_id" })
  principalId: number;

  @Column("int", { name: "diagram_id" })
  diagramId: number;

  @Column("int", { name: "version", nullable: true })
  version: number | null;

  @Column("varbinary", { name: "definition", nullable: true })
  definition: Buffer | null;
}
