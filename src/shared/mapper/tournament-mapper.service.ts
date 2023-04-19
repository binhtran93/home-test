import { Injectable } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { TournamentEntity } from '../../tournament/tournament.entity';
import { TournamentDto } from '../../tournament/dtos/tournament.dto';

@Injectable()
export class TournamentMapperService
  implements MapperService<TournamentEntity, TournamentDto>
{
  /**
   * Map @TournamentEntity to @TournamentDto
   * @param entity
   */
  map(entity: TournamentEntity): TournamentDto {
    const dto = new TournamentDto();
    dto.id = entity.id;
    dto.name = entity.name;

    return dto;
  }

  /**
   * Condition for the mapping
   * @param entity
   * @return boolean
   */
  supports(entity: object) {
    return entity instanceof TournamentEntity;
  }
}
