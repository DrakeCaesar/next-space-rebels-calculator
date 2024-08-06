/** Exported memory */
export declare const memory: WebAssembly.Memory;
/**
 * assembly/index/calculateScore
 * @param comboCounts `~lib/map/Map<~lib/string/String,i32>`
 * @returns `i32`
 */
export declare function calculateScore(comboCounts: __Internref4): number;
/**
 * assembly/index/findBestCombination
 * @param tags `~lib/array/Array<assembly/bindings/Tag>`
 * @returns `assembly/bindings/Result`
 */
export declare function findBestCombination(tags: Array<__Internref0>): __Internref0;
/** ~lib/map/Map<~lib/string/String,i32> */
declare class __Internref4 extends Number {
  private __nominal4: symbol;
  private __nominal0: symbol;
}
/** assembly/bindings/Tag */
declare class __Internref0 extends Number {
  private __nominal0: symbol;
}
/** assembly/bindings/Result */
declare class __Internref0 extends Number {
  private __nominal0: symbol;
}
