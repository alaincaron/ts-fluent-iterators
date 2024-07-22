import * as Functions from '../functions';
import { Predicate } from '../types';

export function negate<T>(p: Predicate<T>) {
  return (t: T) => !p(t);
}

export function or<T>(p1: Predicate<T>, p2: Predicate<T>) {
  return (t: T) => p1(t) || p2(t);
}

export function and<T>(p1: Predicate<T>, p2: Predicate<T>) {
  return (t: T) => p1(t) && p2(t);
}

export function nor<T>(p1: Predicate<T>, p2: Predicate<T>) {
  return (t: T) => !(p1(t) || p2(t));
}

export function nand<T>(p1: Predicate<T>, p2: Predicate<T>) {
  return (t: T) => !(p1(t) && p2(t));
}

export function xor<T>(p1: Predicate<T>, p2: Predicate<T>) {
  return (t: T) => p1(t) != p2(t);
}

export function xnor<T>(p1: Predicate<T>, p2: Predicate<T>) {
  return (t: T) => p1(t) === p2(t);
}

export const alwaysTrue = Functions.always(true);
export const alwayFalse = Functions.always(false);
