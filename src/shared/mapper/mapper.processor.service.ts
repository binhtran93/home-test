import { Inject, Injectable } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { MAPPER_SERVICES } from './const';

@Injectable()
export class MapperProcessorService {
  constructor(
    @Inject(MAPPER_SERVICES)
    private readonly mapperServices: MapperService<any, any>[],
  ) {}

  map<E, D>(entity: E): D {
    for (const mapperService of this.mapperServices) {
      if (mapperService.supports(entity)) {
        return mapperService.map(entity);
      }
    }

    throw new Error('Could not find mapper');
  }
}
