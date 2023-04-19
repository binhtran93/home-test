import { Inject, Injectable } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { MAPPER_SERVICES } from './const';

/**
 * Using Strategy Pattern for the mapper module, this allows us to achieve "Open/Closed Principle" to avoid modify
 * existing classes
 */
@Injectable()
export class MapperProcessorService {
  constructor(
    @Inject(MAPPER_SERVICES)
    private readonly mapperServices: MapperService<any, any>[],
  ) {}

  /**
   * Find valid mapper based on entity type and then map to DTO
   * @param entity
   * @throws Error
   */
  map<E, D>(entity: E): D {
    for (const mapperService of this.mapperServices) {
      if (mapperService.supports(entity)) {
        return mapperService.map(entity);
      }
    }

    throw new Error('Could not find mapper');
  }
}
