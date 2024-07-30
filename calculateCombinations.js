// Define the mapping key, including 1 which does not affect multiplication
const mappingKey = { 1: 1, 2: 2, 3: 5, 4: 15, 5: 30 };

// Function to generate combinations of elements that sum to a target
function combinationSum(digits, target, start = 0, partial = []) {
  const s = partial.reduce((a, b) => a + b, 0);

  if (s === target) {
    return [partial];
  }
  if (s >= target) {
    return [];
  }

  let results = [];
  for (let i = start; i < digits.length; i++) {
    const n = digits[i];
    if (s + n <= target) {
      results = results.concat(
        combinationSum(digits, target, i, partial.concat([n])),
      );
    }
  }
  return results;
}

// Digits available and the target sum
const digits = [1, 2, 3, 4, 5];
const targetSum = 10;

// Generate all combinations that sum to the target
const combinations = combinationSum(digits, targetSum);

// Sort each combination in descending order before removing 1 and transforming
const results = combinations.map((comb) => {
  // Sort in descending order and remove 1s before transformation
  const sortedComb = comb.sort((a, b) => b - a).filter((num) => num !== 1);
  const transformed = sortedComb.map((num) => mappingKey[num]);
  const product = transformed.reduce((acc, num) => acc * num, 1);
  return {
    combination: sortedComb.join(", "),
    transformed: transformed.join(", "),
    product,
  };
});

// Sort results by product in descending order
results.sort((a, b) => b.product - a.product);

// Display the results using console.table
console.table(results);
