import { ApiProperty } from '@nestjs/swagger';

export class HandleErrorDTO {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;
}
