import { ApiProperty } from '@nestjs/swagger';

export class AvailableFixturesDateResponseDto {
  @ApiProperty({
    description: 'ISO-8601 format',
    example: '2023-05-15T16:08:14',
  })
  date: string;
}
