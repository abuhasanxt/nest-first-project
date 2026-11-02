
import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard.js';


@Controller()
export class AppController {
  
@UseGuards(LocalAuthGuard)
@Post('auth/login')
async login(@Request() req: any) {
  return req.user;
}

}
