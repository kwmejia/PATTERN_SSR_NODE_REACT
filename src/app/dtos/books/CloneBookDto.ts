import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  IsDateString,
} from "class-validator";

export class CloneBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @IsDateString()
  publishedAt?: string;
}
