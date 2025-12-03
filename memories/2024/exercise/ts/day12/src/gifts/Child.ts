import { Behavior } from './Behavior';
import { Toy } from './Toy';
import { WishList } from './WishList';

export class Child {
  public wishlist: WishList | null = null;

  constructor(public name: string, public behavior: Behavior) { }

  setWishlist(firstChoice: Toy, secondChoice: Toy, thirdChoice: Toy): void {
    this.wishlist = new WishList(firstChoice, secondChoice, thirdChoice);
  }
}
