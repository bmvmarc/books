import { Entity, ObjectIdColumn, ObjectID, Column, OneToMany, JoinTable } from "typeorm"
import { Book } from "./Book"

@Entity()
export class Author {

    @ObjectIdColumn()
    id: ObjectID

    @Column()
    name: string

    @Column()
    year: number

    @OneToMany(() => Book, (book) => book.author)
    books: Book[]

}
