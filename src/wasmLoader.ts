// Define the type for the Emscripten module factory function
type TagsModuleFactory = () => Promise<TagsModule>;

// Simplified interface for the WASM module
export interface TagsModule {
  // Main tag combination finder function
  findBestTagCombination: (
    targetJson: string,
    tagsJson: string,
    rulesJson: string,
    maxDepth: number
  ) => {
    combination: string[];
    score: number;
    details: string;
  };
}

// Global reference to the loaded module
let loadedModule: TagsModule | null = null;

// Function to load the WASM module
export async function loadWasmModule(): Promise<TagsModule> {
  if (loadedModule) {
    return loadedModule;
  }

  try {
    // Import the Emscripten-generated module factory
    // @ts-ignore - Suppress TypeScript error for WASM module import
    const moduleImport = await import("./cpp/tags.wasm.js");
    const moduleFactory: TagsModuleFactory =
      moduleImport.default as unknown as TagsModuleFactory;

    // Initialize the module
    const module = await moduleFactory();

    loadedModule = module;
    return module;
  } catch (error) {
    console.error("Failed to load WASM module:", error);
    throw error;
  }
}

// Function to get the loaded module (assumes it's already loaded)
export function getWasmModule(): TagsModule {
  if (!loadedModule) {
    throw new Error("WASM module not loaded. Call loadWasmModule() first.");
  }
  return loadedModule;
}
