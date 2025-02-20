import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.model";

@Entity("pins")
export class Pin extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 6, nullable: false })
  code: string;

  @ManyToOne(() => User, (user) => user.pins, { onDelete: "CASCADE" })
  user: User;
}
