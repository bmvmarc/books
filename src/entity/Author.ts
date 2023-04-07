import { Entity, ObjectIdColumn, Column, OneToMany, Relation } from "typeorm";
import { Book } from "./Book.js";

@Entity()
export class Author {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @OneToMany(() => Book, (book) => book.author)
  books: Relation<Book>[];
}
