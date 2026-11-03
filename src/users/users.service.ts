import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findAll() {
    const users = await this.usersRepository.find();

    return {
      message: 'Users retrieved successfully',
      data: users.map((user) => ({
        id: user.id,
        username: user.username,
      })),
    };
  }
  // Get single user by ID
  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'User retrieved successfully',
      data: {
        id: user.id,
        username: user.username,
      },
    };
  }

 async remove(id: number) {
  const user = await this.usersRepository.findOneBy({ id });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  await this.usersRepository.delete(id);

  return {
    message: 'User deleted successfully',
    data: {
      id: user.id,
    },
  };
}
  // Find user by username (For Authentication)
  findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }
  async Signup(body: any) {
    const existUser = await this.usersRepository.findOneBy({
      username: body.username,
    });
    if (existUser) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'You already registered',
        },
        HttpStatus.CONFLICT,
      );
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const UserEntity: User = this.usersRepository.create({
      ...body,
      password: hashedPassword,
    } as Partial<User>);
    const saveUser = await this.usersRepository.save(UserEntity);
    const { id, username } = saveUser;
    return {
      message: 'User created successfully',
      data: {
        id,
        username,
      },
    };
  }
}
