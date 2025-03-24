import { IsEmail, IsNotEmpty, IsString, MinLength, IsIn, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  @IsIn(['admin', 'user'])
  role: 'admin' | 'user' = 'user';
}