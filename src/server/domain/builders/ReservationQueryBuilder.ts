import { AppDataSource } from "@infra/database/data-source";
import { Reservation } from "@domain/models/Reservation";

export class ReservationQueryBuilder {
  private query = AppDataSource.getRepository(Reservation)
    .createQueryBuilder("reservation")
    .leftJoin("reservation.user", "user")
    .leftJoinAndSelect("reservation.book", "book");

  withUserId(userId: string): this {
    this.query.andWhere("user.id = :userId", { userId });
    return this;
  }

  onlyActive(): this {
    this.query.andWhere("reservation.expiresAt > NOW()");
    return this;
  }

  orderedByDate(): this {
    this.query.orderBy("reservation.reservedAt", "DESC");
    return this;
  }

  build() {
    return this.query.getMany();
  }
}
