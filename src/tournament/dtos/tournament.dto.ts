import { ApiProperty } from '@nestjs/swagger';

export class TournamentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
