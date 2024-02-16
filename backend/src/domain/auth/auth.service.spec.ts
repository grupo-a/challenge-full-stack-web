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

    describe('validateToken', () => {
        it('should return user data if token is valid', async () => {
            const validateTokenDto: ValidateTokenDto = { token: 'testToken' };
            const userData = { id: 1, username: 'testUser', type: 'admin' };
            jest.spyOn(authService, 'validateToken').mockResolvedValue(userData);

            const result = await authController.validateToken(validateTokenDto);

            expect(result).toEqual(userData);
        });

        it('should throw UnauthorizedException if token is invalid', async () => {
            const validateTokenDto: ValidateTokenDto = { token: 'invalidToken' };
            jest.spyOn(authService, 'validateToken').mockRejectedValue(new UnauthorizedException());

            await expect(authController.validateToken(validateTokenDto)).rejects.toThrow(UnauthorizedException);
        });
    });
});
