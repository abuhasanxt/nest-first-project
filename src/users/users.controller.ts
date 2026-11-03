import {
  Controller,
  Get,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Get all users
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Get single user
  @Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  return this.usersService.findOne(id);
}

  // Delete user
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}