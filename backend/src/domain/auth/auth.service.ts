import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UserService) { }

  async login(loginDTO: LoginDto) {
    const matchUser = await this.validateCredentials(loginDTO.username, loginDTO.password);

    return {
      token: this.jwtService.sign({
        username: matchUser.username,
        type: matchUser.user_type,
      })
    };
  }

  async validateToken(validateTokenDTO: ValidateTokenDto) {
    try {
      const payload = this.jwtService.verify(validateTokenDTO.token);
      const user = await this.userService.findByUsername(payload.username);

      if (!user) throw new Error('User not found');

      return {
        id: user.id,
        username: user.username,
        type: user.user_type,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async validateCredentials(username: string, password: string) {
    try {
      const user = await this.userService.findByUsername(username);
      if (user.username === username && bcrypt.compareSync(password, user.password)) {
        return user;
      }
      throw new BadRequestException('Invalid credentials');
    } catch (error) {
      throw new BadRequestException('Invalid credentials');
    }
  }
}
