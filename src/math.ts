import { Tag } from "./tags";
import { ResultMessage } from "./worker";

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

export async function findBestCombination(tags: Tag[]): Promise<ResultMessage> {return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module",
    });

    worker.onmessage = (e: MessageEvent) => {
      const message = e.data;
      if (message.type === "progress") {
        const elapsedTime = (Date.now() - startTime) / 1000;
        const estimatedRemaining = parseFloat(
          message.estimatedRemaining.replace(/[^\d.]/g, ""),
        );
        const totalEstimate = elapsedTime + estimatedRemaining;
        const finishTime = new Date(
          startTime + totalEstimate * 1000,
        ).toLocaleTimeString();

        console.log(
          `P: ${message.percentage.toFixed(2).padEnd(6)} | ET: ${formatTime(
            elapsedTime,
          ).padEnd(12)} | ER: ${formatTime(estimatedRemaining).padEnd(
            12,
          )} | TE: ${formatTime(totalEstimate).padEnd(12)} | FT: ${finishTime}`,
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

    const startTime = Date.now();
    worker.postMessage({ tags });
  });
}
