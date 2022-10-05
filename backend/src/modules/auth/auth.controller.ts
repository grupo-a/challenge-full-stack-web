import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PayloadToSignin } from './payloads/payload-to-signin';

@ApiTags('SignIn')
@Controller('signin')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Acesso do colaborador ao sistema' })
  async create(@Body() payload: PayloadToSignin): Promise<{ token: string }> {
    return { token: await this.service.signIn(payload) };
  }
}
