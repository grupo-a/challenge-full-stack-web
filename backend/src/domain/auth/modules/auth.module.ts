import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../auth.controller';
import { AuthService } from '../services/auth.service';
import { JwtStrategyService } from '../strategies/jwt.strategy.service';
import { jwtConfig } from '../jwt.config';
import { UserModule } from './user.module';

@Module({
    imports: [
        JwtModule.registerAsync(jwtConfig),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategyService],
})
export class AuthModule { }
