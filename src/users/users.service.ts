
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity.js';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async Signup(body:any){
    const existUser=await this.usersRepository.findOneBy({username:body.username})
    if (existUser) {
       throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'You already registered',
    }, HttpStatus.FORBIDDEN)
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const UserEntity = this.usersRepository.create({ ...body, password: hashedPassword });
    return this.usersRepository.save(UserEntity)
  }
}
