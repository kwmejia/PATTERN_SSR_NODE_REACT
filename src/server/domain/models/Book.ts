import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ type: "int" })
  quantity: number;

  @Column({ type: "date" })
  publishedAt: Date;

  constructor(
    title?: string,
    author?: string,
    quantity?: number,
    publishedAt?: Date
  ) {
    if (title) this.title = title;
    if (author) this.author = author;
    if (quantity) this.quantity = quantity;
    if (publishedAt) this.publishedAt = publishedAt;
  }

  clone(): Book {
    const copy = new Book();
    copy.title = this.title;
    copy.author = this.author;
    copy.quantity = this.quantity;
    copy.publishedAt = this.publishedAt;
    return copy;
  }
}
