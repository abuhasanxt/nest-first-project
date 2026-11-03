import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service.js';
import { createBookDto } from './dtos/create-book.dto.js';
import { Book } from './book.entity.js';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('/get')
  getBook(): Promise<Book[]> {
    return this.bookService.findAll();
  }
  @Get('/get/:id')
  async getBookById(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    const book = await this.bookService.findOne(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  @Post('/add')
  async addBook(@Body() body: createBookDto): Promise<Book> {
    console.log(body);
    return this.bookService.addBook(body);
  }

@Put('/update/:id')
async updateBook(
  @Param('id', ParseIntPipe) id: number,
  @Body() data: Partial<Omit<Book, 'id'>>,
): Promise<Book> {
  return this.bookService.update(id, data);
}
@Delete("/:id")
async removeBook(
    @Param('id',ParseIntPipe)id:number,
):Promise<{message:string}>{
    await this.bookService.remove(id)
    return {message:"Book deleted successfully"}
}

}
