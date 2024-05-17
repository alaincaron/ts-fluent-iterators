export interface WindowCollector<A, B = A> {
  enterWindow(item: A): B;
  leaveWindow(item: A): void;
}

export class SumWindowCollector implements WindowCollector<number> {
  private sum: number;
  private correction = 0;

  constructor(initial = 0) {
    this.sum = initial;
  }

  private add(x: number) {
    const y = x - this.correction;
    const t = this.sum + y;
    this.correction = t - this.sum - y;
    this.sum = t;
    return t;
  }

  enterWindow(x: number) {
    return this.add(x);
  }

  leaveWindow(x: number) {
    return this.add(-x);
  }
}

export class MovingAverageCollector implements WindowCollector<number> {
  private n: number = 0;
  private avg: number = 0;

  enterWindow(x: number) {
    this.avg += (x - this.avg) / ++this.n;
    return this.avg;
  }

  leaveWindow(x: number) {
    this.avg -= (x - this.avg) / --this.n;
  }
}
