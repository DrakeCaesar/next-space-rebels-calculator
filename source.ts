// Define the types for the tags and combos
type TagRarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Viral";
type ComboCategory =
  | "???"
  | "CUTE"
  | "AWESOME"
  | "NOOB"
  | "SMART"
  | "WEIRD"
  | "WILD"
  | "COOL"
  | "ASPIRING";

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
    name: "Lightweight",
    description: "For having a rocket weighing less than 1 kilogram",
    rarity: "Uncommon",
    combos: ["CUTE"],
  },
  {
    name: "Power Boost",
    description: "For using 3 boosters",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Tail",
    description: "For using a tail part",
    rarity: "Common",
    combos: ["WILD"],
  },
  {
    name: "Teddy Bear",
    description: "For using a teddy bear",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Teddy Nose",
    description: "For using a teddy bear at the top of the rocket",
    rarity: "Uncommon",
    combos: ["CUTE", "???"],
  },
  {
    name: "Improviser",
    description: "For using the rocket kit set and a toilet roll",
    rarity: "Uncommon",
    combos: ["NOOB", "WEIRD"],
  },
  {
    name: "Nose",
    description: "For using a nose part",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Old Fashioned",
    description: "For using a nose, body, tail and nothing else",
    rarity: "Uncommon",
    combos: ["SMART"],
  },
  {
    name: "Trash",
    description: "For using the trash set",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Hotdog",
    description: "For sandwiching a booster between 2 other parts",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Fanboy",
    description: "For beating a challenge from ChannelTips",
    rarity: "Uncommon",
    combos: ["COOL", "???"],
  },
  {
    name: "Toilet Roll",
    description: "For using a toilet roll",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Orange",
    description: "For using 2 orange parts",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Cheetah",
    description: "For reaching a speed of 120 km/h",
    rarity: "Common",
    combos: ["WILD"],
  },
  {
    name: "Perfectly Symmetric",
    description: "For having a perfectly symmetric rocket",
    rarity: "Uncommon",
    combos: ["COOL"],
  },
  {
    name: "Purist",
    description: "For using only one structure set",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Mega Boost",
    description: "For using 4 boosters",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Baby",
    description: "For using a baby",
    rarity: "Common",
    combos: ["CUTE", "???"],
  },
  {
    name: "Oops",
    description: "For hitting a building",
    rarity: "Uncommon",
    combos: ["NOOB", "???"],
  },
  {
    name: "Unsymmetric",
    description: "For having an unsymmetric rocket",
    rarity: "Uncommon",
    combos: ["WEIRD"],
  },
  {
    name: "Stroll",
    description: "For reaching a distance of 10 meters",
    rarity: "Common",
    combos: ["NOOB"],
  },
  {
    name: "RocketGirl",
    description: "For beating a challenge from RocketGirl",
    rarity: "Uncommon",
    combos: ["AWESOME", "???"],
  },
  {
    name: "Tin Can",
    description: "For using a tin can",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Cherry",
    description: "For using a cherry bomb",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Explosion",
    description: "For triggering an explosion",
    rarity: "Uncommon",
    combos: ["AWESOME"],
  },
  {
    name: "Fireworks",
    description: "For using the fireworks set",
    rarity: "Common",
    combos: [],
  },
  {
    name: "BangCo",
    description: "For beating a challenge from BangCo",
    rarity: "Uncommon",
    combos: ["ASPIRING"],
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
