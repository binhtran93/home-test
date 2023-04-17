import { ApiProperty } from '@nestjs/swagger';

export class FixtureDto {
  @ApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
  })
  test: number;
}
