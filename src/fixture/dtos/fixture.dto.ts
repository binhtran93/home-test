import { ApiProperty } from '@nestjs/swagger';
import { TournamentDto } from '../../tournament/dtos/tournament.dto';
import { TeamDto } from '../../team/dtos/team.dto';

export class FixtureDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  tournament: TournamentDto;

  @ApiProperty()
  homeTeam: TeamDto;

  @ApiProperty()
  awayTeam: TeamDto;

  @ApiProperty()
  homeTeamScore: number;

  @ApiProperty()
  awayTeamScore: number;

  @ApiProperty({
    enum: ['scheduled', 'live', 'FT'],
  })
  state: string;

  @ApiProperty()
  date: Date;
}
