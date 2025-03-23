export interface UserBehavior {
  canCreateBooks(): boolean;
  canReserveBooks(): boolean;
  maxReservations(): number;
}
