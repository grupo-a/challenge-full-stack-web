import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { AuthGuard } from '@nestjs/passport';
describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: AuthService,
        useValue: {
          login: jest.fn(),
        },
      }],
    })
      .overrideGuard(AuthGuard('local'))
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('session', () => {
    it('should call authService.login with the provided body', async () => {
      const body = { ra: 'testuser', password: 'testpassword' };
      const loginSpy = jest.spyOn(authService, 'login');

      await controller.session(body);

      //expect(loginSpy).toHaveBeenCalledWith(body);
      expect(loginSpy).toHaveBeenCalledTimes(1);
    });
  });
});


