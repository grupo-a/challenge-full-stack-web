import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfiguration } from './common/constants';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfiguration),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
