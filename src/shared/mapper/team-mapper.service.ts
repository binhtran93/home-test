import { Injectable } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { TeamEntity } from '../../team/team.entity';
import { TeamDto } from '../../team/dtos/team.dto';

@Injectable()
export class TeamMapperService implements MapperService<TeamEntity, TeamDto> {
  map(entity: TeamEntity): TeamDto {
    const dto = new TeamDto();
    dto.id = entity.id;
    dto.name = entity.name;

    return dto;
  }

  supports(entity: object) {
    return entity instanceof TeamEntity;
  }
}
