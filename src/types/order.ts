import { Coupon } from './coupon';

export type Order = Coupon & {
  camerasIds: number[];
}
