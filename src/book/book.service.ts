import { Injectable } from '@nestjs/common';
import { Book } from './book.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private book: Repository<Book>) {}
  
  findAll(): Promise<Book[]> {
    return this.book.find();
  }

  addBook(data: any) {
    console.log(data);
    const bookEntity = this.book.create({
      name: data.name,
      writer: data.writer,
      price: data.price,
    });
    return this.book.save(bookEntity);
  }
}
