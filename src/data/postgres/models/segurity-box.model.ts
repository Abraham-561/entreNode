import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.model";
import { Credential } from "./credential.model";

@Entity("security_boxes")
export class SecurityBox extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 100, nullable: false })
  name: string;

  @Column("boolean", { default: true })
  favorite: boolean;

  @Column("varchar", { length: 20, nullable: false })
  icon: string;

  @Column("varchar", { length: 20, default: "ACTIVE" })
  status: string;

  @ManyToOne(() => User, (user) => user.securityBoxes, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => Credential, (credential) => credential.securityBox)
  credentials: Credential[];
}
