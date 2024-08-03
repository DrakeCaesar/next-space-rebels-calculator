import { Tag } from "./tags.ts";

export interface ResultMessage {
  type: "result";
  bestCombination: Tag[];
  score: number;
  allScores: Set<number>;
}

export async function findBestCombination(tags: Tag[]): Promise<ResultMessage> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module",
    });

    worker.onmessage = (e: MessageEvent) => {
      const message = e.data;
      if (message.type === "progress") {
        console.log(
          `Progress: ${message.percentage.toFixed(
            2,
          )}%, Estimated time remaining: ${message.estimatedRemaining}`,
        );
      } else if (message.type === "result") {
        resolve(message);
        worker.terminate();
      }
    };

    worker.onerror = (error) => {
      reject(error);
      worker.terminate();
    };

    worker.postMessage({ tags });
  });
}
