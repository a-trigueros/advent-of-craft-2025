import { IPickerFactory } from './Picker';
import { ISearchChild } from './Repository';
import { Toy } from './Toy';


export class Santa {

  constructor(
    private childrenRepository: ISearchChild,
    private pickerFactory: IPickerFactory) { }

  chooseToyForChild(childName: string): Toy | undefined {

    const foundChild = this.childrenRepository.findByName(childName);

    if (!foundChild) {
      throw new Error('No such child found');
    }

    var picker = this.pickerFactory.buildFor(foundChild.behavior);
    return picker.pickGift(foundChild.wishlist);
  }
}
