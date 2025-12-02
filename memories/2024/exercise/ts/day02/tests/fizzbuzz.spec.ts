import { FizzBuzzConfig, fizzBuzzSetup } from '../src/fizzbuzz';
import * as O from 'fp-ts/Option';
import { isNone, isSome } from 'fp-ts/Option';
import * as fc from 'fast-check';
import { pipe } from 'fp-ts/function';

function runTests(
  config: FizzBuzzConfig,
  samples: [number, string][]
) {

  const fizzbuzz = fizzBuzzSetup(config);

  describe('FizzBuzz should return', () => {
    test.each(samples)('its representation %s -> %s', (input, expectedResult) => {
      const conversionResult = fizzbuzz(input);
      expect(isSome(conversionResult)).toBeTruthy();

      if (isSome(conversionResult)) {
        expect(conversionResult.value).toBe(expectedResult);
      }
    });

    test('valid strings for numbers between 1 and 100', () => {
      fc.assert(
        fc.property(
          fc.integer().filter(n => n >= config.min && n <= config.max),
          (n) => isConvertValid(n)
        )
      );
    });

    const isConvertValid = (input: number): boolean => pipe(
      fizzbuzz(input),
      O.exists(result => validStringsFor(input).indexOf(result) >= 0)
    );

    const validStringsFor = (x: number): string[] => [...config.textByDivisors.values(), x.toString()];

    test('none for numbers out of range', () => {
      fc.assert(
        fc.property(
          fc.integer().filter(n => n < config.min || n > config.max),
          (n) => isNone(fizzbuzz(n))
        )
      );
    });
  });
}

runTests({
  min: 1,
  max: 100,
  textByDivisors: new Map<number, string>([
    [7 * 11, 'WhizzBang'],
    [5 * 11, 'BuzzBang'],
    [3 * 11, 'FizzBang'],
    [5 * 7, 'BuzzWhizz'],
    [3 * 7, 'FizzWhizz'],
    [3 * 5, 'FizzBuzz'],
    [11, 'Bang'],
    [7, "Whizz"],
    [3, 'Fizz'],
    [5, 'Buzz'],
  ])
}, [
  [1, '1'],
  [67, '67'],
  [82, '82'],
  [3, 'Fizz'],
  [66, 'FizzBang'],
  [99, 'FizzBang'],
  [5, 'Buzz'],
  [50, 'Buzz'],
  [85, 'Buzz'],
  [15, 'FizzBuzz'],
  [30, 'FizzBuzz'],
  [45, 'FizzBuzz'],
  [7, 'Whizz'],
  [28, 'Whizz'],
  [77, 'WhizzBang'],
  [11, 'Bang'],
  [22, 'Bang'],
  [33, 'FizzBang'],
  [44, 'Bang'],
  [55, 'BuzzBang'],
]);

runTests({
  min: 1,
  max: 100,
  textByDivisors: new Map<number, string>([
    [15, 'FizzBuzz'],
    [3, 'Fizz'],
    [5, 'Buzz'],
  ])
}, [
  [1, '1'],
  [67, '67'],
  [82, '82'],
  [3, 'Fizz'],
  [66, 'Fizz'],
  [99, 'Fizz'],
  [5, 'Buzz'],
  [50, 'Buzz'],
  [85, 'Buzz'],
  [15, 'FizzBuzz'],
  [30, 'FizzBuzz'],
  [45, 'FizzBuzz'],
]);
