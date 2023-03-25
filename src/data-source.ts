import "reflect-metadata"
import { DataSource } from "typeorm"
import { Author } from "./entity/Author"
import { Book } from "./entity/Book"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mongodb",
    database: 'books',
    synchronize: true,
    logging: true,
    username: "bmvmarc",
    password: "lcrp8hINrrCulcY1",
    entities: [User, Book, Author],
    migrations: [],
    subscribers: [],
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    url: 'mongodb+srv://bmvmarc:lcrp8hINrrCulcY1@cluster0.sjdingj.mongodb.net/?retryWrites=true&w=majority',
})
