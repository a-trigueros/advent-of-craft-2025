import { none, Option, some } from "fp-ts/Option";

export type FizzBuzzConfig = {
  min: number;
  max: number;
  textByDivisors: Map<number, string>;
}

export function fizzBuzzSetup(config: FizzBuzzConfig) {
  const min = config.min;
  const max = config.max;

  let mapping: Map<number, string> = config.textByDivisors;

  return (input: number): Option<string> =>
    isOutOfRange(input)
      ? none
      : some(convertSafely(input));

  function convertSafely(input: number): string {
    for (const [divisor, value] of mapping) {
      if (is(divisor, input)) {
        return value;
      }
    }
    return input.toString();
  }

  function is(divisor: number, input: number): boolean {
    return input % divisor === 0;
  }

  function isOutOfRange(input: number): boolean {
    return input < min || input > max;
  }
}
