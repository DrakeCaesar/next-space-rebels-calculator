import { Tag, tags, UNKNOWN } from "../tags.ts";

import fs from "fs";

function calculateScore(comboCounts: { [key: string]: number }): number {
  let score = 0;
  for (const combo in comboCounts) {
    if (combo === UNKNOWN) continue;
    const count = comboCounts[combo];
    if (count === 2) score += 1;
    if (count === 3) score += 3;
    if (count === 4) score += 15;
  }
  return score;
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
}

function findBestCombination(tags: Tag[]): Tag[] {
  let bestScore = 0;
  let bestCombination: Tag[] = [];
  const n = tags.length;

  console.log(n);

  const totalCombinations = (n * (n - 1) * (n - 2) * (n - 3) * (n - 4)) / 120;
  let currentCombination = 0;

  // Start timing
  const startTime = Date.now();

  for (let i = 0; i < n - 4; i++) {
    for (let j = i + 1; j < n - 3; j++) {
      // Calculate progress and estimated remaining time
      currentCombination += ((n - j - 1) * (n - j - 2) * (n - j - 3)) / 6; // Number of combinations for current `j`
      const percentage = (currentCombination / totalCombinations) * 100;
      const elapsed = (Date.now() - startTime) / 1000; // elapsed time in seconds
      const estimatedTotal = (elapsed / currentCombination) * totalCombinations;
      const estimatedRemaining = estimatedTotal - elapsed;

      console.log(
        `Progress: ${percentage.toFixed(
          2,
        )}%, Estimated time remaining: ${formatTime(estimatedRemaining)}`,
      );

      for (let k = j + 1; k < n - 2; k++) {
        for (let l = k + 1; l < n - 1; l++) {
          for (let m = l + 1; m < n; m++) {
            const combination = [tags[i], tags[j], tags[k], tags[l], tags[m]];
            const comboCounts: { [key: string]: number } = {};

            combination.forEach((tag) => {
              tag.combos.forEach((combo) => {
                if (combo !== UNKNOWN) {
                  comboCounts[combo] = (comboCounts[combo] || 0) + 1;
                }
              });
            });

            const score = calculateScore(comboCounts);

            if (score > bestScore) {
              bestScore = score;
              bestCombination = combination;
            }
          }
        }
      }
    }
  }

  return bestCombination;
}

const jsonTags = JSON.stringify(tags, null, 2);
fs.writeFileSync("tags.json", jsonTags);

// Example usage:
const bestTags = findBestCombination(tags);
console.log("Best Combination:", bestTags);
