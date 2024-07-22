type FUNCTION = (...args: any[]) => any;

type PartialParameters<FN extends FUNCTION> = Partial<Parameters<FN>>;

type PartialTuple<TUPLE extends any[], EXTRACTED extends any[] = []> = TUPLE extends [
  infer NEXT_PARAM,
  ...infer REMAINING,
]
  ? PartialTuple<REMAINING, [...EXTRACTED, NEXT_PARAM?]>
  : [...EXTRACTED, ...TUPLE];

type RemainingParameters<PROVIDED extends any[], EXPECTED extends any[]> = EXPECTED extends [infer E1, ...infer EX]
  ? PROVIDED extends [infer P1, ...infer PX]
    ? P1 extends E1
      ? RemainingParameters<PX, EX>
      : never
    : EXPECTED
  : [];

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
  ...startingArgs: STARTING_ARGS
): CurriedFunction<STARTING_ARGS, FN> {
  return function (...args) {
    const totalArgs = [...startingArgs, ...args];
    if (totalArgs.length >= targetFn.length) {
      return targetFn(...totalArgs);
    }
    return curry(targetFn, ...(totalArgs as PartialParameters<FN>));
  };
}
