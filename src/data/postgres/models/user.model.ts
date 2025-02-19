import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { bcryptAdapter } from "../../../config/encrypt";

export enum Status {
  AVAILABLE = "AVAILABLE",
  DISABLED = "DISABLED",
}

@Entity("users") // Nombre de la tabla en la base de datos
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 80, nullable: false })
  name: string;

  @Column("varchar", { length: 80, nullable: false })
  surname: string;

  @Column("varchar", { length: 150, nullable: false, unique: true })
  email: string;

  @Column("varchar", { length: 20, nullable: false, unique: true })
  cellphone: string;

  @Column("varchar", { nullable: false })
  password: string;

  @Column("enum", { enum: Status, default: Status.AVAILABLE })
  status: Status;

  @BeforeInsert()
  async hashPassword() {
      this.password = await bcryptAdapter.encrypt(this.password);
  }
}

