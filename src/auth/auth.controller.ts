import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LocalAuthGuard } from './local-auth.guard.js';
import { createUserDto } from '../users/dtos/create-user.dto.js';

@Controller('auth')
export class AuthController {constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post("/signup")
  SignUp(@Body()body:createUserDto){
    return this.authService.SignUp(body)
  }}
