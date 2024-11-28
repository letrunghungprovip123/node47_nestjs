import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailDto {
  @IsEmail()
  @ApiProperty()
  emailTo: string;
  @IsNotEmpty()
  @ApiProperty()
  subject: string;
  @IsNotEmpty()
  @ApiProperty()
  text: string;
}
