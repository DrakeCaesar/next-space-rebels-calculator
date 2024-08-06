// AssemblyScript code (bindings.ts)

@unmanaged
export class Tag {
  combos: string[];

  constructor(combos: string[]) {
    this.combos = combos;
  }
}

@unmanaged
export class Result {
  bestCombination: Tag[];
  score: i32;

  constructor(bestCombination: Tag[], score: i32) {
    this.bestCombination = bestCombination;
    this.score = score;
  }
}
