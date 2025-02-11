import {
  IsInt,
  Min,
  IsOptional,
  IsString,
  IsIn,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SortOrder } from '../enums/sort-order.enum';

export interface IPagination {
  page?: number;
  limit?: number;
  sort?: 'ASC' | 'DESC';
  sortBy?: string;
}

export interface IPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export class PaginationDto implements IPagination {
  @ApiPropertyOptional({
    description: 'Número da página (mínimo 1)',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Quantidade de registros por página (mínimo 1)',
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Ordem da ordenação',
    example: SortOrder.ASC,
    enum: SortOrder,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sort?: SortOrder = SortOrder.ASC;

  @ApiPropertyOptional({
    description: 'Campo pelo qual a ordenação será feita',
    example: 'id',
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'id';
}
