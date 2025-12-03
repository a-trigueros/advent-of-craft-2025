import { Toy } from "../src/gifts/Toy";
import { Child } from "../src/gifts/Child";
import { Santa } from '../src/gifts/Santa';
import { ChildrenRepository } from "../src/gifts/Repository";
import { Behavior } from "../src/gifts/Behavior";
import { FirstChoicePicker, IPickToyInWishList, PickerFactory, SecondChoicePicker, ThirdChoicePicker } from "../src/gifts/Picker";

describe("Santa's gift selection process", () => {
  const Playstation = new Toy('playstation');
  const Ball = new Toy('ball');
  const Plush = new Toy('plush');
  const pickerFactory = new PickerFactory(new Map<Behavior, IPickToyInWishList>([
    ["very nice", new FirstChoicePicker()],
    ["nice", new SecondChoicePicker()],
    ["naughty", new ThirdChoicePicker()]
  ]));

  it('should give the third choice to a naughty child', () => {
    const bobby = new Child('bobby', 'naughty');
    bobby.setWishlist(Playstation, Plush, Ball);

    var childrenRepository = new ChildrenRepository();
    childrenRepository.addChild(bobby);

    const santa = new Santa(childrenRepository, pickerFactory);

    expect(santa.chooseToyForChild('bobby')).toBe(Ball);
  });

  it('should give the second choice to a nice child', () => {
    const bobby = new Child('bobby', 'nice');
    bobby.setWishlist(Playstation, Plush, Ball);

    var childrenRepository = new ChildrenRepository();
    childrenRepository.addChild(bobby);

    const santa = new Santa(childrenRepository, pickerFactory);
    expect(santa.chooseToyForChild('bobby')).toBe(Plush);
  });

  it('should give the first choice to a very nice child', () => {
    const bobby = new Child('bobby', 'very nice');
    bobby.setWishlist(Playstation, Plush, Ball);

    var childrenRepository = new ChildrenRepository();
    childrenRepository.addChild(bobby);

    const santa = new Santa(childrenRepository, pickerFactory);

    expect(santa.chooseToyForChild('bobby')).toBe(Playstation);
  });

  it('should throw an exception if the child does not exist', () => {
    const bobby = new Child('bobby', 'very nice');
    bobby.setWishlist(Playstation, Plush, Ball);

    var childrenRepository = new ChildrenRepository();
    childrenRepository.addChild(bobby);

    const santa = new Santa(childrenRepository, pickerFactory);

    expect(() => santa.chooseToyForChild('alice')).toThrowError('No such child found');
  });
});
