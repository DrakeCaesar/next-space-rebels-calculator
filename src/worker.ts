// WebAssembly Tag Combination Worker
// This worker runs the WASM tag combination finder to avoid blocking the UI thread

import {
  WorkerState,
  createWorkerState,
  extractCombinationArray,
  prepareWasmRun,
  sendCompletionMessages,
  setupBestMixReporting,
  setupProgressReporting,
} from "./wasmWorkerCommon";

// Worker state
const state: WorkerState = createWorkerState();

// Setup global reporting functions for C++ to call
declare global {
  interface Window {
    reportProgress: (progressData: any) => void;
    reportBestCombinationFound: (combinationData: any) => void;
  }
}

// Implementation of reportProgress that the C++ code will call
(self as any).reportProgress = setupProgressReporting(state);

// Implementation of reportBestCombinationFound that the C++ code will call
(self as any).reportBestCombinationFound = setupBestMixReporting(state);

// Message handler
self.onmessage = async function (e) {
  const { type, data } = e.data;

  try {
    switch (type) {
      case "findBestCombination":
        await handleFindBestCombination(data);
        break;
      case "stop":
        state.isRunning = false;
        self.postMessage({ type: "stopped" });
        break;
      default:
        console.warn("Unknown message type:", type);
    }
  } catch (error) {
    console.error("Worker error:", error);
    state.isRunning = false;
    self.postMessage({
      type: "error",
      data: {
        message: error instanceof Error ? error.message : "Unknown error",
      },
    });
  }
};

async function handleFindBestCombination(data: any) {
  const { target, tags, rules, maxDepth } = data;

  prepareWasmRun(state);

  try {
    // Import and load the WASM module
    const { loadWasmModule } = await import("./wasmLoader");
    const wasmModule = await loadWasmModule();

    // Convert inputs to JSON strings
    const targetJson = JSON.stringify(target);
    const tagsJson = JSON.stringify(tags);
    const rulesJson = JSON.stringify(rules || {});

    // Call the WASM function
    const result = wasmModule.findBestTagCombination(
      targetJson,
      tagsJson,
      rulesJson,
      maxDepth || 10
    );

    // Extract and format the result
    const combination = extractCombinationArray(result);
    const finalResult = {
      combination,
      score: result.score,
      details: result.details,
    };

    sendCompletionMessages(state, finalResult, "combinationFound");
  } catch (error) {
    console.error("Error in WASM calculation:", error);
    state.isRunning = false;
    self.postMessage({
      type: "error",
      data: {
        message: error instanceof Error ? error.message : "Calculation failed",
      },
    });
  }
}
