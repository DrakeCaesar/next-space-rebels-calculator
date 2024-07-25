// Define the types for the tags and combos
type TagRarity = "Epic" | "Uncommon" | "Rare" | "Common";
type ComboCategory = "CUTE" | "???" | "AWESOME" | "NOOB" | "SMART";

interface Tag {
  name: string;
  description: string;
  rarity: TagRarity;
  combos: ComboCategory[];
}

// Initial set of tags
const tags: Tag[] = [
  {
    name: "Rocket Kit",
    description: "For using the rocket kit set",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Challenge",
    description: "For completing a challenge",
    rarity: "Common",
    combos: ["SMART"],
  },
  {
    name: "Beginner",
    description: "For using only the rocket kit structure set",
    rarity: "Common",
    combos: ["CUTE", "???"],
  },
  {
    name: "Extra Boost",
    description: "For using 2 boosters",
    rarity: "Common",
    combos: ["NOOB"],
  },
  {
    name: "Completed Kit",
    description: "For using a completed rocket kit set",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Symmetric",
    description: "For having a symmetric rocket",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Toys",
    description: "For using the toy set",
    rarity: "Common",
    combos: ["CUTE"],
  },
  {
    name: "Child",
    description: "For beating a challenge from SidPhillips",
    rarity: "Common",
    combos: ["CUTE"],
  },
  {
    name: "Architect",
    description: "For using every toy block",
    rarity: "Epic",
    combos: ["CUTE", "???"],
  },
  {
    name: "Girly",
    description: "For using a teddy bear and a baby",
    rarity: "Uncommon",
    combos: ["CUTE"],
  },
  {
    name: "Toy Freak",
    description: "For using 13 different toy parts",
    rarity: "Epic",
    combos: ["CUTE", "AWESOME"],
  },
  {
    name: "Elephant",
    description: "For using a stuffed elephant",
    rarity: "Uncommon",
    combos: ["CUTE"],
  },
  {
    name: "Power-up",
    description: "For using a booster and an engine",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "In Control",
    description: "For spending 5 seconds pressing buttons to control a swivel",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Sprint",
    description: "For reaching a distance of 100 meters",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Thin",
    description:
      "For having the rocket width at least 5 times smaller than its height",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Kilometer",
    description: "For reaching an altitude of 1 kilometer",
    rarity: "Common",
    combos: [],
  },
];

// Function to find combos by category
function findCombosByCategory(category: ComboCategory): Tag[] {
  return tags.filter((tag) => tag.combos.includes(category));
}

// Example usage
console.log(findCombosByCategory("CUTE"));
