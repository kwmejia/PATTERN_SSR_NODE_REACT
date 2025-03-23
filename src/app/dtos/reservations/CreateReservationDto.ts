import { IsUUID } from "class-validator";

export class CreateReservationDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  bookId: string;
}
