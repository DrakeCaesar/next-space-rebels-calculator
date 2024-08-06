import loader from "@assemblyscript/loader";

async function loadWasmModule() {
  try {
    const response = await fetch("http://localhost:5173/output.wasm");
    const buffer = await response.arrayBuffer();
    const wasmModule = await loader.instantiate(buffer, {});
    return wasmModule;
  } catch (e) {
    console.error(e);
    console.error("Error loading wasm module");
  }
}

self.onmessage = async function (e) {
  console.log("test");

  const { tags } = e.data;

  const startTime = Date.now();

  const wasmModule = await loadWasmModule();
  if (!wasmModule) {
    console.error("Failed to load wasm module");
    return;
  }

  const wasmTags = tags.map(
    (tag: { combos: any }) => new wasmModule.Tag(tag.combos),
  );
  const result = wasmModule.findBestCombination(wasmTags);

  const resultMessage = {
    type: "result",
    bestCombination: result.bestCombination,
    score: result.score,
  };

  self.postMessage(resultMessage);
};
