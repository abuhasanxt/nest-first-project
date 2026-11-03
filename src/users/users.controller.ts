import {
  Controller,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Body,
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
@Patch(':id')
updateUser(
  @Param('id', ParseIntPipe) id: number,
  @Body() data: { username: string },
) {
  return this.usersService.update(id, data);
}
  // Delete user
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}