
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

  findOne(username:string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async Signup(body:any){
    const existUser=await this.usersRepository.findOneBy({username:body.username})
    if (existUser) {
       throw new HttpException({
      status: HttpStatus.CONFLICT,
      error: 'You already registered',
    }, HttpStatus.CONFLICT)
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const UserEntity: User = this.usersRepository.create({ ...body, password: hashedPassword } as Partial<User>);
    const saveUser=await this.usersRepository.save(UserEntity)
    const {id,username}=saveUser
    return {
      message:"User created successfully",
      data:{
        id,
        username
      }
    }
  }
}
