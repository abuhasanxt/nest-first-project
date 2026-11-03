import { Body, Controller, Get, Post } from "@nestjs/common";
import { BookService } from "./book.service.js";
import { createBookDto } from "./dtos/create-book.dto.js";
import { Book } from "./book.entity.js";

@Controller('book')
export class BookController{
constructor(private readonly bookService:BookService){}

@Get('/get')
getBook():string{
    return this.bookService.getBook()
}

@Post('/add')
async addBook(@Body() body:createBookDto):Promise<Book>{
    console.log(body);
    return this.bookService.addBook(body)
}
}