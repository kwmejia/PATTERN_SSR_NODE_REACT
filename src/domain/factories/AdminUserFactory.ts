import { UserBehavior } from '@domain/factories/UserBehavior';
import { UserFactoryRole } from '@domain/factories/UserFactoryRole';

export class AdminUserFactory implements UserFactoryRole {
  createBehavior(): UserBehavior {
    return {
      canCreateBooks: () => true,
      canReserveBooks: () => true,
      maxReservations: () => Infinity
    };
  }
}