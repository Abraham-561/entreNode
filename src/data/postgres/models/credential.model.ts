import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SecurityBox } from "../../postgres/models/segurity-box.model";
import { Pin } from "./pin.model";

@Entity("credential_storage")
export class Credential extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 100, nullable: false })
  account: string;

  @Column("varchar", { length: 255, nullable: false })
  password: string;

  @Column("text", { nullable: true })
  description?: string;

  @Column("varchar", { length: 20, nullable: true })
  code_1?: string;

  @Column("varchar", { length: 20, nullable: true })
  code_2?: string;

  @ManyToOne(() => SecurityBox, (securityBox) => securityBox.credentials, { nullable: false })
  securityBox: SecurityBox;

 
}

