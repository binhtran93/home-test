import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQuery {
  @Type(() => Date)
  @ApiPropertyOptional({
    description: 'ISO-8601 format',
    example: '2023-05-15T16:08:14',
  })
  startDate?: Date;

  @Type(() => Date)
  @ApiPropertyOptional({
    description: 'ISO-8601 format',
    example: '2023-05-20 16:08:13',
  })
  endDate?: Date;

  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Filter by tournament id',
    example: 1,
  })
  tournamentId?: number;

  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Limit number of fixtures',
    example: 30,
  })
  limit?: number;

  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Page of fixtures',
    example: 1,
    required: false,
  })
  page?: number;
}
