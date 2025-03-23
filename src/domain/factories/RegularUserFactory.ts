import { UserBehavior } from '@domain/factories/UserBehavior';
import { UserFactoryRole } from '@domain/factories/UserFactoryRole';

export class RegularUserFactory implements UserFactoryRole {
  createBehavior(): UserBehavior {
    return {
      canCreateBooks: () => false,
      canReserveBooks: () => true,
      maxReservations: () => 5
    };
  }
}