import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => Book)
  @JoinColumn({ name: "bookId" })
  book!: Book;

  @Column({ type: "timestamp" })
  reservedAt: Date | string;

  @Column({ type: "timestamp" })
  expiresAt: Date | string;

  constructor(user?: User, book?: Book, reservedAt?: Date, expiresAt?: Date) {
    if (user) this.user = user;
    if (book) this.book = book;
    if (reservedAt) this.reservedAt = reservedAt;
    if (expiresAt) this.expiresAt = expiresAt;
  }
  //Pattern Protoype
  clone(): Reservation {
    const copy = new Reservation();
    copy.user = this.user;
    copy.book = this.book;
    copy.reservedAt = new Date();
    copy.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días más
    return copy;
  }
}
