import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService({} as any, {} as any);
        authController = new AuthController(authService);
    });

    describe('login', () => {
        it('should return token if credentials are valid', async () => {
            const loginDto: LoginDto = { username: 'testUser', password: 'password' };
            const token = { token: 'testToken' };
            jest.spyOn(authService, 'login').mockResolvedValue(token);

            const result = await authController.login(loginDto);

            expect(result).toEqual(token);
        });
    });
});
