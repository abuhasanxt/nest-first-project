import { Controller, Get } from "@nestjs/common";
import { BookService } from "./book.service.js";

@Controller('book')
export class BookController{
constructor(private readonly bookService:BookService){}

@Get('/get')
getBook():string{
    return this.bookService.getBook()
}
}