import { Module } from '@nestjs/common';
import { StudantsModule } from './modules/students/studants.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeesModule } from './modules/employees/employees.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    StudantsModule,
    EmployeesModule,
  ],
})
export class AppModule {}
