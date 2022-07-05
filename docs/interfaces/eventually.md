[ts-fluent-iterators - v1,0,0](../README.md) › ["types"](../modules/types.md) › [Eventually](eventually.md)

# Type: Eventually <**A**>

Represents a value of type `A` or `Promise<A>`.  
  
  Example: ``const value: Eventually<number> = Promise.resolve(5)``

``type Eventually<A> = A | Promise<A>``
