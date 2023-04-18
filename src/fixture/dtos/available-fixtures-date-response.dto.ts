import { ApiProperty } from '@nestjs/swagger';

export class AvailableFixturesDateResponseDto {
  @ApiProperty({
    description: 'Date format',
    example: '2023-05-15',
  })
  date: string;
}
