export interface MapperService<E, D> {
  /**
   * Convert entity to object
   * @param entity
   */
  map(entity: E): D;

  /**
   * Convert condition
   * @param entity
   */
  supports(entity: any): boolean;
}
