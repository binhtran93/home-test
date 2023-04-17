import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class PaginationQuery {
  @Type(() => Date)
  @IsNotEmpty()
  startDate: Date;

  @Type(() => Date)
  @IsNotEmpty()
  endDate: Date;
}
