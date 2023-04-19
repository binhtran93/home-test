import { Injectable } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { TeamEntity } from '../../team/team.entity';
import { TeamDto } from '../../team/dtos/team.dto';

@Injectable()
export class TeamMapperService implements MapperService<TeamEntity, TeamDto> {
  /**
   * Map @TeamEntity to @TeamDto
   * @param entity
   */
  map(entity: TeamEntity): TeamDto {
    const dto = new TeamDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.logo = entity.logo;

    return dto;
  }

  /**
   * Condition for the mapping
   * @param entity
   * @return boolean
   */
  supports(entity: object) {
    return entity instanceof TeamEntity;
  }
}
