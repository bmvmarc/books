import { AppDataSource } from "./data-source"
import { Author } from "./entity/Author"
import { Book } from "./entity/Book"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // const user = await myDataSource.manager.findOneBy(User, {
    //     id: 1,
    // })

    // ___________________________________
    const authorRepository = AppDataSource.getRepository(Author)
    // const author = new Author();
    // author.name = "Fiodor Dostojewski";
    // author.year = 1821;
    // await authorRepository.save(author);

    
    const booksRepo = AppDataSource.getRepository(Book)
    // const book1 = new Book();
    // book1.title = "Crime and Punishment";
    // book1.year = 1866;
    // book1.author = author;

    // await booksRepo.save(book1);

    // const book2 = new Book();
    // book2.title = "The idiot";
    // book2.year = 1869;
    // book2.author = author;

    // await booksRepo.save(book2);

    // const allAuthorsWithBooks = await authorRepository.findAndCount()

    // console.log(allAuthorsWithBooks);


    const [bookQ, quantity] = await booksRepo.findAndCount()
 
    console.log(bookQ, quantity);

    
}).catch(error => console.log(error))
