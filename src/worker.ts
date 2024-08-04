import { Tag } from "./tags.ts";

interface ComboCounts {
  [key: string]: number;
}

function calculateScore(comboCounts: ComboCounts): number {
  let score = 1;
  for (const combo in comboCounts) {
    const count = comboCounts[combo];
    if (count === 2) score *= 2;
    if (count === 3) score *= 5;
    if (count === 4) score *= 15;
    if (count === 5) score *= 30;
  }
  return score;
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
}

function checkAndPostProgress(
  currentCombination: number,
  totalCombinations: number,
  startTime: number,
): number {
  const percentage = (currentCombination / totalCombinations) * 100;
  const elapsed = (Date.now() - startTime) / 1000; // elapsed time in seconds
  const estimatedTotal = (elapsed / currentCombination) * totalCombinations;
  const estimatedRemaining = estimatedTotal - elapsed;

  const progressMessage: ProgressMessage = {
    type: "progress",
    percentage: percentage,
    estimatedRemaining: formatTime(estimatedRemaining),
  };
  postMessage(progressMessage);
  return 0; // Reset counter after posting progress message
}

interface FindBestCombinationPayload {
  tags: Tag[];
}

interface ProgressMessage {
  type: "progress";
  percentage: number;
  estimatedRemaining: string;
}

export interface ResultMessage {
  type: "result";
  bestCombination: Tag[];
  score: number;
  allScores: Set<number>;
}

self.onmessage = async function (e: MessageEvent) {
  const { tags }: FindBestCombinationPayload = e.data;
  const tagsCopy = [...tags];

  // Create comboCounts object
  const comboCounts: ComboCounts = {};
  tagsCopy.forEach((tag) => {
    tag.combos.forEach((combo: string) => {
      comboCounts[combo] = (comboCounts[combo] || 0) + 1;
    });
  });

  // Print the combo counts
  console.log("Combo counts:", JSON.stringify(comboCounts, null, 2));

  // Print the number of tags before pruning
  console.log(`Number of tags before pruning: ${tagsCopy.length}`);

  // Prune tags that have only 1 combo
  let prunedTags = tagsCopy.filter((tag) => tag.combos.length > 1);

  // Print the number of tags after pruning
  console.log(`Number of tags after pruning: ${prunedTags.length}`);

  // Create an object to store the count of pruned tags for each combo
  const prunedComboCounts: ComboCounts = {};
  prunedTags.forEach((tag) => {
    tag.combos.forEach((combo: string) => {
      prunedComboCounts[combo] = (prunedComboCounts[combo] || 0) + 1;
    });
  });

  //throw away half the set for testing
  // prunedTags = prunedTags.slice(0, prunedTags.length / 4);
  // throw away all but Baby Display Head Body Clown

  // prunedTags = prunedTags.filter(
  //   (tag) =>
  //     tag.name === "Baby" ||
  //     tag.name === "Display" ||
  //     tag.name === "Head" ||
  //     tag.name === "Body" ||
  //     tag.name === "Clown",
  // );

  // Print the pruned combo counts
  console.log(
    "Pruned combo counts:",
    JSON.stringify(prunedComboCounts, null, 2),
  );

  let bestScore = 0;
  let bestCombination: Tag[] = [];
  const allScores: Set<number> = new Set();
  const n = prunedTags.length;

  const totalCombinations = (n * (n - 1) * (n - 2) * (n - 3) * (n - 4)) / 120;
  let currentCombination = 0;

  // Start timing
  const startTime = Date.now();
  let messageTime = startTime;

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
            const combinationCounts: ComboCounts = {};

            combination.forEach((tag) => {
              tag.combos.forEach((combo: string) => {
                combinationCounts[combo] = (combinationCounts[combo] || 0) + 1;
              });
            });

            const score = calculateScore(combinationCounts);
            allScores.add(score);

            if (score > bestScore) {
              bestScore = score;
              bestCombination = combination;
            }

            currentCombination++;
            const currentTime = Date.now();
            if (currentTime - messageTime > 1000) {
              messageTime = currentTime;
              checkAndPostProgress(
                currentCombination,
                totalCombinations,
                startTime,
              );
            }
          }
        }
      }
    }
  }

  const resultMessage: ResultMessage = {
    type: "result",
    bestCombination: bestCombination,
    score: bestScore,
    allScores: allScores,
  };
  postMessage(resultMessage);
};
