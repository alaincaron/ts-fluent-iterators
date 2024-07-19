import { Functor } from './functors';
import { Mapper } from './types';

type FUNCTION = (...args: any[]) => any;

type PartialParameters<FN extends FUNCTION> = Partial<Parameters<FN>>;

type PartialTuple<TUPLE extends any[], EXTRACTED extends any[] = []> =
  // If the tuple provided has at least one required value
  TUPLE extends [infer NEXT_PARAM, ...infer REMAINING]
    ? // recurse back in to this type with one less item
      // in the original tuple, and the latest extracted value
      // added to the extracted list as optional
      PartialTuple<REMAINING, [...EXTRACTED, NEXT_PARAM?]>
    : // else if there are no more values,
      // return an empty tuple so that too is a valid option
      [...EXTRACTED, ...TUPLE];

type RemainingParameters<PROVIDED extends any[], EXPECTED extends any[]> =
  // if the expected array has any required items…
  EXPECTED extends [infer E1, ...infer EX]
    ? // if the provided array has at least one required item
      PROVIDED extends [infer P1, ...infer PX]
      ? // if the type is correct, recurse with one item less
        //in each array type
        P1 extends E1
        ? RemainingParameters<PX, EX>
        : // else return this as invalid
          never
      : // else the remaining args is unchanged
        EXPECTED
    : // else there are no more arguments
      [];

type CurriedFunction<PROVIDED extends any[], FN extends FUNCTION> = <
  NEW_ARGS extends PartialTuple<RemainingParameters<PROVIDED, Parameters<FN>>>,
>(
  ...args: NEW_ARGS
) => CurriedFunctionOrReturnValue<[...PROVIDED, ...NEW_ARGS], FN>;

type CurriedFunctionOrReturnValue<PROVIDED extends any[], FN extends FUNCTION> =
  RemainingParameters<PROVIDED, Parameters<FN>> extends [any, ...any[]]
    ? CurriedFunction<PROVIDED, FN>
    : ReturnType<FN>;

export function curry<FN extends FUNCTION, STARTING_ARGS extends PartialParameters<FN>>(
  targetFn: FN,
  ...existingArgs: STARTING_ARGS
): CurriedFunction<STARTING_ARGS, FN> {
  return function (...args) {
    const totalArgs = [...existingArgs, ...args];
    if (totalArgs.length >= targetFn.length) {
      return targetFn(...totalArgs);
    }
    return curry(targetFn, ...(totalArgs as PartialParameters<FN>));
  };
}

// type PartialFunction<PROVIDED extends any[], FN extends FUNCTION> = <
//   NEW_ARGS extends PartialTuple<RemainingParameters<PROVIDED, Parameters<FN>>>,
// >(
//   ...args: NEW_ARGS
// ) => ReturnType<FN>;

export abstract class GenericFunctor<FN extends FUNCTION> {
  abstract eval(...args: Parameters<FN>): ReturnType<FN>;

  asFunction(): FN {
    return this.eval.bind(this) as FN;
  }

  andThen<V>(after: Functor<ReturnType<FN>, V> | Mapper<ReturnType<FN>, V>) {
    after = Functor.getFunction(after);
    return GenericFunctor.from((...args: Parameters<FN>) => after(this.eval(...args)));
  }

  static from<FN extends FUNCTION>(f: FN) {
    return new GenericFunctionalFunctor<FN>(f);
  }

  curry<STARTING_ARGS extends PartialParameters<FN>>(...startingArgs: STARTING_ARGS) {
    return curry(this.asFunction(), ...startingArgs);
  }

  partial<STARTING_ARGS extends PartialParameters<FN>>(...startingArgs: STARTING_ARGS) {
    return new GenericFunctionalFunctor(this.asFunction().bind(null, ...startingArgs));
  }
}

class GenericFunctionalFunctor<FN extends FUNCTION> extends GenericFunctor<FN> {
  constructor(private readonly f: FN) {
    super();
  }

  eval(...args: Parameters<FN>): ReturnType<FN> {
    return this.f(...args);
  }

  asFunction(): FN {
    return this.f;
  }

  partial<STARTING_ARGS extends PartialParameters<FN>>(...startingArgs: STARTING_ARGS) {
    return new GenericFunctionalFunctor(this.f.bind(null, ...startingArgs));
  }
}
