import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConfig } from './jwt.config';
import { UserModule } from '../users/user.module';

@Module({
    imports: [
        JwtModule.registerAsync(jwtConfig),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
