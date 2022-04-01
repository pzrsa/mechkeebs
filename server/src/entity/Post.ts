import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Keyboard } from "./Keyboard";
import { User } from "./User";

@Entity({ name: "posts" })
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "image_name" })
  imageName: string;

  @Column({ name: "keyboard_id" })
  keyboardId: number;

  @OneToOne(() => Keyboard, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "keyboard_id" })
  keyboard: Keyboard;

  @Column({ name: "creator_id" })
  creatorId: number;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "creator_id" })
  creator: User;

  @Column({ name: "created_at" })
  createdAt: number;

  @Column({ name: "updated_at", nullable: true })
  updatedAt: number;

  @BeforeInsert()
  public setCreatedAt() {
    this.createdAt = Math.floor(Date.now() / 1000);
  }

  @BeforeUpdate()
  public setUpdatedAt() {
    this.updatedAt = Math.floor(Date.now() / 1000);
  }
}
