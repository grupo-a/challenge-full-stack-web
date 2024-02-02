import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './app/users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [ 
    ConfigModule.forRoot(),
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
