import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FixtureEntity } from '../../fixture/fixture.entity';
import { FixtureDto } from '../../fixture/dtos/fixture.dto';
import { MapperService } from './mapper.service';
import { MapperProcessorService } from './mapper.processor.service';

@Injectable()
export class FixtureMapperService
  implements MapperService<FixtureEntity, FixtureDto>
{
  constructor(
    @Inject(forwardRef(() => MapperProcessorService))
    private readonly mapperProcessorService: MapperProcessorService,
  ) {}

  map(entity: FixtureEntity): FixtureDto {
    const dto = new FixtureDto();
    dto.id = entity.id;
    dto.homeTeam = this.mapperProcessorService.map(entity.homeTeam);
    dto.awayTeam = this.mapperProcessorService.map(entity.awayTeam);
    dto.tournament = this.mapperProcessorService.map(entity.tournament);
    dto.state = entity.state;
    dto.homeTeamScore = entity.homeTeamScore;
    dto.awayTeamScore = entity.awayTeamScore;
    dto.date = entity.date;

    return dto;
  }

  supports(entity: object) {
    return entity instanceof FixtureEntity;
  }
}
