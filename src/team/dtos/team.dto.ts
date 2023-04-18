import { ApiProperty } from '@nestjs/swagger';

export class TeamDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  logo: string;
}
