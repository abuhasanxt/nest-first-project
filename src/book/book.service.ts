import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private book: Repository<Book>) {}

  findAll(): Promise<Book[]> {
    return this.book.find();
  }
findOne(id: number): Promise<Book | null> {
    return this.book.findOne({ where: { id } });
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

 async update(
  id: number,
  data: Partial<Omit<Book, 'id'>>,
): Promise<Book> {
  //  Find existing book
  const book = await this.book.findOne({
    where: { id },
  });

  if (!book) {
    throw new NotFoundException('Book not found');
  }

  //  Prevent ID update
  if ('id' in data) {
    throw new BadRequestException('Book ID cannot be updated');
  }

  //  Remove undefined fields
  const updateData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined),
  );

  //  Check at least one field provided
  if (Object.keys(updateData).length === 0) {
    throw new BadRequestException('At least one field is required');
  }

  //  Check whether any field actually changed
  const isChanged = Object.entries(updateData).some(
    ([key, value]) => book[key as keyof Book] !== value,
  );

  if (!isChanged) {
    throw new ConflictException('Book already updated');
  }

  //  Update book
  await this.book.update(id, updateData);

  //  Return updated book
  return this.book.findOneByOrFail({ id });
}

async remove(id: number): Promise<void> {
  // Check book exists
  const book = await this.book.findOne({
    where: { id },
  });

  if (!book) {
    throw new NotFoundException('Book not found');
  }

  // Delete book
  await this.book.delete(id);
}
}
