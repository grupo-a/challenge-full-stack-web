import {
  IsString,
  IsUrl,
  IsNumber,
  IsPositive,
  IsOptional,
  IsEnum,
  IsNumberString,
  IsUUID,
} from 'class-validator';

export enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class ConfigEnv {
  @IsString()
  @IsEnum(NodeEnv)
  nodeEnv: string;

  @IsNumber()
  @IsPositive()
  httpPort: number;

  @IsString()
  jwtSecret: string;

  @IsString()
  typeormHost: string;

  @IsNumber()
  @IsPositive()
  typeormPort: number;

  @IsString()
  typeormUsername: string;

  @IsString()
  typeormPassword: string;

  @IsString()
  typeormDatabase: string;

  get isProduction(): boolean {
    return this.nodeEnv === NodeEnv.Production;
  }
}
