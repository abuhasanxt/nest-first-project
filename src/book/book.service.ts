import { Injectable } from "@nestjs/common";
import { Book } from "./book.entity.js";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable ()
export class BookService{
    constructor(@InjectRepository(Book) private  book:Repository<Book>){}
getBook():string{
    return "take book"
}

addBook(data:any){
     console.log(data);
     const bookEntity = this.book.create({name:data.name,writer:data.writer,price:data.price})
    return this.book.save(bookEntity)
}

}