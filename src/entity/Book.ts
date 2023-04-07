import { Entity, ObjectIdColumn, Column, ManyToOne, Relation } from 'typeorm';
import { Author } from "./Author.js";

@Entity()
export class Book {
  @ObjectIdColumn()
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => Author, (author) => author.books)
  author: Relation<Author>;

  @Column()
  year: number;
}
