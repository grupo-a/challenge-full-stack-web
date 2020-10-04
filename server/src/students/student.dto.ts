import { IsEmail, IsNotEmpty, IsString, IsNumberString } from "class-validator";
import {
  CreateStudentDtoInterface,
  UpdateStudentDtoInterface,
} from "@shared/interfaces";

export class IdentifyStudentDto {
  @IsNumberString()
  id: string;
}

export class CreateStudentDto implements CreateStudentDtoInterface {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  ra: string;

  @IsNotEmpty()
  cpf: string;
}

export class UpdateStudentDto implements UpdateStudentDtoInterface {
  @IsString()
  name?: string;

  @IsEmail()
  email?: string;
}
