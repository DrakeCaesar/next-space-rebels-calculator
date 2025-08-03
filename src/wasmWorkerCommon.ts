// Common worker functionality shared between different WASM workers

export interface WorkerState {
  isRunning: boolean;
  startTime: number;
  lastProgressTime: number;
  lastBestScore: number;
  progressCallback?: (data: any) => void;
  bestMixCallback?: (data: any) => void;
}

export function createWorkerState(): WorkerState {
  return {
    isRunning: false,
    startTime: 0,
    lastProgressTime: 0,
    lastBestScore: 0,
  };
}

export function setupProgressReporting(state: WorkerState) {
  return (progressData: any) => {
    if (!state.isRunning) return;

    const currentTime = Date.now();
    const elapsed = currentTime - state.startTime;

    // Throttle progress reports to avoid overwhelming the main thread
    if (currentTime - state.lastProgressTime < 100) return;
    state.lastProgressTime = currentTime;

    // Post progress message to main thread
    self.postMessage({
      type: "progress",
      data: {
        ...progressData,
        elapsed,
      },
    });
  };
}

export function setupBestMixReporting(state: WorkerState) {
  return (mixData: any) => {
    if (!state.isRunning) return;

    const currentTime = Date.now();
    const elapsed = currentTime - state.startTime;

    // Only report if this is actually better
    if (mixData.score > state.lastBestScore) {
      state.lastBestScore = mixData.score;

      // Post best mix message to main thread
      self.postMessage({
        type: "bestMixFound",
        data: {
          ...mixData,
          elapsed,
        },
      });
    }
  };
}

export function prepareWasmRun(state: WorkerState) {
  state.isRunning = true;
  state.startTime = Date.now();
  state.lastProgressTime = 0;
  state.lastBestScore = 0;
}

export function sendCompletionMessages(
  state: WorkerState,
  result: any,
  messageType: string = "result"
) {
  const elapsed = Date.now() - state.startTime;

  // Send final result
  self.postMessage({
    type: messageType,
    data: {
      ...result,
      elapsed,
    },
  });

  // Send completion message
  self.postMessage({
    type: "complete",
    data: { elapsed },
  });

  state.isRunning = false;
}

export function extractCombinationArray(result: any): string[] {
  // Convert Emscripten vector to JavaScript array
  const array: string[] = [];
  for (let i = 0; i < result.combination.size(); i++) {
    array.push(result.combination.get(i));
  }
  return array;
}
