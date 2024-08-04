import { Tag } from "./tags";
import { ResultMessage } from "./worker";

export async function findBestCombination(tags: Tag[]): Promise<ResultMessage> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module",
    });

    worker.onmessage = (e: MessageEvent) => {
      const message = e.data;
      if (message.type === "progress") {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        const estimatedRemaining = parseFloat(
          message.estimatedRemaining.replace(/[^\d.]/g, ""),
        );
        const totalEstimate = (
          parseFloat(elapsedTime) + estimatedRemaining
        ).toFixed(2);
        const finishTime = new Date(
          startTime + totalEstimate * 1000,
        ).toLocaleTimeString();

        console.log(
          `P: ${message.percentage
            .toFixed(2)
            .padEnd(6)} | ET: ${elapsedTime.padEnd(
            8,
          )} | ER: ${message.estimatedRemaining.padEnd(
            12,
          )} | TE: ${totalEstimate.padEnd(8)} | FT: ${finishTime}`,
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
