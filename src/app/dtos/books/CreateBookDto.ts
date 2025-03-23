import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  IsDateString,
} from "class-validator";

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsDateString()
  publishedAt: string;
}