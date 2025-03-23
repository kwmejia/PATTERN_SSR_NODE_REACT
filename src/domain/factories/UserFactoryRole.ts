import { UserBehavior } from '@domain/factories/UserBehavior';

export interface UserFactoryRole {
  createBehavior(): UserBehavior;
}