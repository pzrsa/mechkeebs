import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "setups" })
export class Setup extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "simple-array" })
  items: string[];

  @Column({ name: "creator_id" })
  creatorId: number;

  @ManyToOne(() => User, (user) => user.setups, { onDelete: "CASCADE" }) // if the user gets deleted, then delete posts associated with that creatorid
  @JoinColumn({ name: "creator_id" })
  creator: User;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
