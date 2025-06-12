/**
 * A `Collector` is an object that collects elements of type `A` and aggregates them into an object of type `B`.
 * @typeParam A the type of elements being collected.
 * @typeParam B the type of the aggregated object.
 */
export interface Collector<A, B> {
  /**
   * Collects an element.
   * @param a The element being collected.
   */
  collect(a: A): void;

  /**
   * Returns the aggregated object.
   * @returns The aggregated object resulting from collecting all objects
   */
  get result(): B;
}
