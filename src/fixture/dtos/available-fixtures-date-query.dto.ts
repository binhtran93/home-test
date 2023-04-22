import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AvailableFixturesDateQueryDto {
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
  @ApiPropertyOptional({
    description: 'Filter by tournament id',
    example: 1,
  })
  tournamentId?: number;
}
