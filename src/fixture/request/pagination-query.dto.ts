import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationQuery {
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({
    description: 'ISO-8601 format',
    example: '2023-05-15T16:08:14',
  })
  startDate: Date;

  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({
    description: 'ISO-8601 format',
    example: '2023-05-20 16:08:13',
  })
  endDate: Date;

  @Type(() => Number)
  @ApiProperty({
    description: 'Limit number of fixtures for each request',
    example: '30',
    required: false,
  })
  limit: number = 20;
}
