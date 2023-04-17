import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty, } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class DatesHaveMatchesQueryDto {
  @Type(() => Date)
  @IsNotEmpty()
  @ApiModelProperty({
    description: 'ISO-8601 format',
    example: '2023-05-15T16:08:14',
  })
  startDate: Date;

  @Type(() => Date)
  @IsNotEmpty()
  @ApiModelProperty({
    description: 'ISO-8601 format',
    example: '2023-05-20 16:08:13',
  })
  endDate: Date;
}
