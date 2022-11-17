import { IsNotEmpty, IsString } from 'class-validator';

export class NotificationsDTO {
  // public  token: string;
  // public  title: string;
  // public  body: string;

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
