import { Injectable } from '@nestjs/common';
import { FixtureEntity } from '../../fixture/fixture.entity';
import { FixtureDto } from '../../fixture/dtos/fixture.dto';
import { MapperService } from './mapper.service';

@Injectable()
export class FixtureMapperService
  implements MapperService<FixtureEntity, FixtureDto>
{
  map(entity: FixtureEntity): FixtureDto {
    const dto = new FixtureDto();
    dto.id = entity.id;

    return dto;
  }

  supports(entity: object) {
    return entity instanceof FixtureEntity;
  }
}
