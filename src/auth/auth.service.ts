import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      return null;
    }
    const isPasswordMatch = await bcrypt.compare(pass, user.password);
    if (!isPasswordMatch) {
      return null;
    }
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      message:"Login successfully",
      access_token: this.jwtService.sign(payload),
    };
  }

  async SignUp(body: any): Promise<any> {
    return this.usersService.Signup(body);
  }
}
