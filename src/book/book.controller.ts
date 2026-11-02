import { Body, Controller, Get, Post } from "@nestjs/common";
import { BookService } from "./book.service.js";
import { createBookDto } from "./dtos/create-book.dto.js";

@Controller('book')
export class BookController{
constructor(private readonly bookService:BookService){}

@Get('/get')
getBook():string{
    return this.bookService.getBook()
}

@Post('/add')
addBook(@Body() body:createBookDto){
    console.log(body);
    return this.bookService.addBook(body)
}
}