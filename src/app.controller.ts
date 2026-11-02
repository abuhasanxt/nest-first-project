
import { Controller, Request, Post, UseGuards,  Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard.js';
import { AuthService } from './auth/auth.service.js';
import { createUserDto } from './users/dtos/create-user.dto.js';

@Controller("auth")
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post("/signup")
  SignUp(@Body()body:createUserDto){
    return this.authService.SignUp(body)
  }
}
