import { ComboCategory, Tag, tags, UNKNOWN } from "./tags";

// Function to count combo frequencies, excluding "UNKNOWN"
function countComboFrequencies(tags: Tag[]): Map<ComboCategory, number> {
  const comboFrequency = new Map<ComboCategory, number>();

  tags.forEach((tag) => {
    tag.combos.forEach((combo) => {
      if (combo !== UNKNOWN) {
        comboFrequency.set(combo, (comboFrequency.get(combo) || 0) + 1);
      }
    });
  });

  return comboFrequency;
}

// Function to find the best set of tags based on maximizing combo occurrences
function findBestTagSet(tags: Tag[], setSize: number): Tag[] {
  const comboFrequency = countComboFrequencies(tags);
  const sortedCombos = Array.from(comboFrequency.keys()).sort(
    (a, b) => comboFrequency.get(b)! - comboFrequency.get(a)!,
  );

  const selectedTags: Tag[] = [];
  const selectedCombos = new Set<ComboCategory>();

  // Prioritize selecting tags with the most common combos
  for (const combo of sortedCombos) {
    if (selectedTags.length >= setSize) break;

    const tagsWithCombo = tags.filter(
      (tag) => tag.combos.includes(combo) && combo !== UNKNOWN,
    );
    for (const tag of tagsWithCombo) {
      if (selectedTags.length < setSize) {
        selectedTags.push(tag);
        tag.combos.forEach((c) => selectedCombos.add(c));
      }
    }
  }

  // If the selected tags are less than the set size, fill with the most frequent remaining tags
  if (selectedTags.length < setSize) {
    const remainingTags = tags.filter(
      (tag) => !selectedTags.includes(tag) && !tag.combos.includes(UNKNOWN),
    );
    for (const tag of remainingTags) {
      if (selectedTags.length < setSize) {
        selectedTags.push(tag);
      } else {
        break;
      }
    }
  }

  return selectedTags;
}

// Example usage
// const bestTagSet = findBestTagSet(tags, 5);
// console.log(bestTagSet);

// Function to find combos by category
function findCombosByCategory(category: ComboCategory): Tag[] {
  return tags.filter((tag) => tag.combos.includes(category));
}

// Example usage
console.log(findCombosByCategory("SMART"));
