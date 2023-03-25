import { Entity, ObjectIdColumn, ObjectID, Column, ManyToOne } from "typeorm";
import { Author } from "./Author";

@Entity()
export class Book {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @ManyToOne(() => Author, (author) => author.books, {
    eager: true,
  })
  author: Author;

  @Column()
  year: number;
}
