// AssemblyScript code (index.ts)

import { Result, Tag } from "./bindings";

export function calculateScore(comboCounts: Map<string, i32>): i32 {
  let score = 1;
  const keys = comboCounts.keys();
  for (let i = 0, len = keys.length; i < len; i++) {
    const combo = keys[i];
    const count = comboCounts.get(combo);
    if (count == 2) score *= 2;
    if (count == 3) score *= 5;
    if (count == 4) score *= 15;
    if (count == 5) score *= 30;
  }
  return score;
}

export function findBestCombination(tags: Array<Tag>): Result {
  const comboCounts = new Map<string, i32>();
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    for (let j = 0; j < tag.combos.length; j++) {
      const combo = tag.combos[j];
      comboCounts.set(combo, (comboCounts.get(combo) || 0) + 1);
    }
  }

  // Prune tags
  let prunedTags = tags.filter((tag) => tag.combos.length > 1);

  let bestScore = 0;
  let bestCombination = new Array<Tag>();
  const n = prunedTags.length;

  for (let i = 0; i < n - 4; i++) {
    for (let j = i + 1; j < n - 3; j++) {
      for (let k = j + 1; k < n - 2; k++) {
        for (let l = k + 1; l < n - 1; l++) {
          for (let m = l + 1; m < n; m++) {
            const combination = [
              prunedTags[i],
              prunedTags[j],
              prunedTags[k],
              prunedTags[l],
              prunedTags[m],
            ];
            const combinationCounts = new Map<string, i32>();

            for (let a = 0; a < combination.length; a++) {
              const tag = combination[a];
              for (let b = 0; b < tag.combos.length; b++) {
                const combo = tag.combos[b];
                combinationCounts.set(
                  combo,
                  (combinationCounts.get(combo) || 0) + 1,
                );
              }
            }

            const score = calculateScore(combinationCounts);
            if (score > bestScore) {
              bestScore = score;
              bestCombination = combination;
            }
          }
        }
      }
    }
  }

  return new Result(bestCombination, bestScore);
}
