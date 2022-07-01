import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "twitter_id", select: false })
  twitterId: string;

  @Column({ name: "twitter_username" })
  twitterUsername: string;

  @Column({ name: "twitter_image_url" })
  twitterImageUrl: string;

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

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
