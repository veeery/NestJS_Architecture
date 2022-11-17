import { IsNotEmpty, IsString } from 'class-validator';

export class NotificationsDTO {
  
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}
