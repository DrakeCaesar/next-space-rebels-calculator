import { Tag } from "./tags";

// Worker result interface
interface WorkerResultMessage {
  type: string;
  data: {
    combination: string[];
    score: number;
    details: string;
    elapsed: number;
  };
}

// Legacy result format for compatibility
interface ResultMessage {
  bestCombination: Tag[];
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
}
const possibleScores = [
  1, 2, 4, 5, 8, 10, 15, 16, 20, 25, 30, 32, 40, 50, 60, 64, 75, 80, 100, 120,
  125, 150, 160, 200, 225, 240, 250, 300, 375, 450, 600, 625, 750, 900, 1125,
];

export async function findBestCombination(tags: Tag[]): Promise<ResultMessage> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module",
    });

    worker.onmessage = (e: MessageEvent) => {
      const message = e.data;
      if (message.type === "progress") {
        const elapsedTime = (Date.now() - startTime) / 1000;
        console.log(`Progress: ${JSON.stringify(message.data)}`);
      } else if (message.type === "bestMixFound") {
        console.log(`Best combination found: ${JSON.stringify(message.data)}`);
      } else if (
        message.type === "combinationFound" ||
        message.type === "result"
      ) {
        // Convert worker result to expected format
        const workerResult = message as WorkerResultMessage;
        const legacyResult: ResultMessage = {
          bestCombination: workerResult.data.combination
            .map((tagName) => tags.find((tag) => tag.name === tagName))
            .filter(Boolean) as Tag[],
        };
        resolve(legacyResult);
        worker.terminate();
      } else if (message.type === "complete") {
        console.log(`Calculation complete in ${message.data.elapsed}ms`);
      } else if (message.type === "error") {
        reject(new Error(message.data.message));
        worker.terminate();
      }
    };

    worker.onerror = (error) => {
      reject(error);
      worker.terminate();
    };

    const startTime = Date.now();
    worker.postMessage({
      type: "findBestCombination",
      data: {
        target: {}, // Define what target should be for tag combinations
        tags: tags,
        rules: {}, // Define any rules if needed
        maxDepth: 10, // Or whatever depth is appropriate
      },
    });
  });
}
