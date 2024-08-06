const fs = require("fs");
const loader = require("@assemblyscript/loader");

const wasmModule = loader.instantiateSync(fs.readFileSync("./output.wasm"), {});

self.onmessage = async function (e) {
  const { tags } = e.data;
  const startTime = Date.now();

  const wasmTags = tags.map(
    (tag: { combos: any }) => new wasmModule.Tag(tag.combos),
  );

  const result = wasmModule.findBestCombination(wasmTags);

  const resultMessage = {
    type: "result",
    bestCombination: result.bestCombination,
    score: result.score,
  };

  postMessage(resultMessage);
};
