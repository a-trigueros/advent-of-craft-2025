import { Behavior } from "./Behavior";
import { Toy } from "./Toy";
import { WishList } from "./WishList";

export interface IPickToyInWishList {
  pickGift(wishlist: WishList): Toy;
}

export class FirstChoicePicker implements IPickToyInWishList {
  pickGift(wishlist: WishList): Toy {
    return wishlist.firstChoice;
  }
}

export class SecondChoicePicker implements IPickToyInWishList {
  pickGift(wishlist: WishList): Toy {
    return wishlist.secondChoice;
  }
}

export class ThirdChoicePicker implements IPickToyInWishList {
  pickGift(wishlist: WishList): Toy {
    return wishlist.thirdChoice;
  }
}

export interface IPickerFactory {
  buildFor(behavior: Behavior): IPickToyInWishList;
}

export class PickerFactory implements IPickerFactory {
  constructor(private pickerByBehavior: Map<Behavior, IPickToyInWishList>) { }
  public buildFor(behavior: Behavior): IPickToyInWishList {
    return this.pickerByBehavior.get(behavior);
  }
}
