import { ApiProperty } from '@nestjs/swagger';

//DTO Pattern
export class HandleErrorDTO {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;
}
