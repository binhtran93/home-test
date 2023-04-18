import { Injectable } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { TournamentEntity } from '../../tournament/tournament.entity';
import { TournamentDto } from '../../tournament/dtos/tournament.dto';

@Injectable()
export class TournamentMapperService
  implements MapperService<TournamentEntity, TournamentDto>
{
  map(entity: TournamentEntity): TournamentDto {
    const dto = new TournamentDto();
    dto.id = entity.id;
    dto.name = entity.name;

    return dto;
  }

  supports(entity: object) {
    return entity instanceof TournamentEntity;
  }
}
