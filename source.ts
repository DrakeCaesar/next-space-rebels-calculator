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
  | "ASPIRING"
  | "FUNNY"
  | "GROSS"
  | "NAUGHTY"
  | "CREEPY";

interface Tag {
  name: string;
  description: string;
  rarity: TagRarity;
  combos: ComboCategory[];
  blocked?: boolean;
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
    name: "Censored",
    description: "unknown",
    rarity: "Epic",
    combos: ["???"],
    blocked: true,
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
    name: "Timed",
    description: "For triggering a time sensor",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Tiny House",
    description: "For building a house with a toy block cube and roof",
    rarity: "Rare",
    combos: ["CUTE"],
  },
  {
    name: "Skeleton",
    description:
      "For having a rocket with only 10% of its mass consisting of structure parts",
    rarity: "Epic",
    combos: [],
  },
  {
    name: "Minimal",
    description: "For using only 1 structure part",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Furlong",
    description: "For reaching an altitude of 201 meters",
    rarity: "Common",
    combos: ["NOOB", "???"],
  },
  {
    name: "Shark",
    description: "For using 2 side fins",
    rarity: "Uncommon",
    combos: ["WILD"],
  },
  {
    name: "Funnel",
    description: "For using a funnel",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Rocket Kit XL",
    description: "For using a rocket kit XL part",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Tube",
    description: "For using a tube part",
    rarity: "Common",
    combos: ["SMART", "???"],
  },
  {
    name: "PVC",
    description: "For using the PVC set",
    rarity: "Common",
    combos: ["SMART"],
  },
  {
    name: "DIY",
    description: "For using only the PVC structure set",
    rarity: "Rare",
    combos: ["SMART"],
  },
  {
    name: "Looping",
    description: "For making a looping",
    rarity: "Uncommon",
    combos: ["AWESOME"],
  },
  {
    name: "Stunt",
    description: "For beating 'Stunt Rocket'",
    rarity: "Epic",
    combos: ["AWESOME"],
  },
  {
    name: "Mozambique",
    description: "For beating 'The Perfect Pump'",
    rarity: "Epic",
    combos: [],
  },
  {
    name: "Engine",
    description: "For using an engine",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Fuel",
    description: "For using a fuel tank",
    rarity: "Common",
    combos: ["SMART"],
  },
  {
    name: "Bottle",
    description: "For using a fuel bottle",
    rarity: "Common",
    combos: [],
  },
  {
    name: "RaySon",
    description: "For beating a challenge from RaySon",
    rarity: "Uncommon",
    combos: ["SMART"],
  },
  {
    name: "Football",
    description: "For using a football",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Trash Crafter",
    description: "For using 3 different trash parts",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Pandemic",
    description: "For using 5 toilet rolls",
    rarity: "Epic",
    combos: ["FUNNY", "GROSS"],
  },
  {
    name: "Top",
    description: "For using a spinning top",
    rarity: "Uncommon",
    combos: ["CUTE"],
  },
  {
    name: "Rings",
    description: "For using a ring pyramid",
    rarity: "Common",
    combos: ["CUTE"],
  },
  {
    name: "Playtime",
    description: "For using only the toy structure set",
    rarity: "Rare",
    combos: ["CUTE"],
  },
  {
    name: "I like to connect",
    description: "For having at least 10 pipes in your rocket",
    rarity: "Epic",
    combos: [],
  },
  {
    name: "Falcon",
    description: "For reaching a speed of 390 km/h",
    rarity: "Uncommon",
    combos: ["WILD"],
  },
  {
    name: "Horny",
    description: "unknown",
    rarity: "Rare",
    combos: ["???"],
    blocked: true,
  },
  {
    name: "Firecracker",
    description: "For using a firecracker",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Bad Luck",
    description: "For having a top altitude of 13 meters",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Alive",
    description: "For combining a limb and a swivel",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Train",
    description: "For using a wooden train",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Toy Blocks",
    description: "For using 4 different toy block parts",
    rarity: "Rare",
    combos: ["CUTE"],
  },
  {
    name: "Custom",
    description: "For using a rocket kit part and a PVC part",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Boost",
    description: "For using a booster",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Extremely Unsymmetric",
    description: "For having a completely unsymmetric rocket",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Circus",
    description: "For combining a stuffed elephant and a ball part",
    rarity: "Rare",
    combos: ["FUNNY", "AWESOME"],
  },
  {
    name: "Baby Satay",
    description: "unknown",
    rarity: "Rare",
    combos: ["???"],
    blocked: true,
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
  {
    name: "Ridiculous",
    description: "For beating 'Ridiculous Rocket Challenge'",
    rarity: "Viral",
    combos: ["AWESOME", "???"],
  },
  {
    name: "Cocks",
    description: "unknown",
    rarity: "Epic",
    combos: ["???"],
    blocked: true,
  },
  {
    name: "One-legged",
    description: "For using only 1 leg part",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Race",
    description: "For beating 'Wait, that's illegal'",
    rarity: "Epic",
    combos: ["NAUGHTY"],
  },
  {
    name: "Double Barrel",
    description: "For using 2 upward straight parts at the same height",
    rarity: "Uncommon",
    combos: ["SMART"],
  },
  {
    name: "Illegal",
    description: "For using an illegal firework",
    rarity: "Uncommon",
    combos: ["NAUGHTY"],
  },
  {
    name: "Twin Tail",
    description: "For using 2 tail parts",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Rollercoaster",
    description: "For making 3 loopings",
    rarity: "Rare",
    combos: ["AWESOME"],
  },
  {
    name: "Monster",
    description: "For beating 'Looping Monster'",
    rarity: "Viral",
    combos: ["CREEPY", "AWESOME"],
  },
  {
    name: "Connection",
    description: "For using a connection part",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Saddle",
    description: "For using a bike saddle",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Frame",
    description: "For using a bike frame",
    rarity: "Common",
    combos: ["WEIRD"],
  },
  {
    name: "Vehicle",
    description: "For using a wheel at the bottom of the rocket",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Bike",
    description: "For using a bike set",
    rarity: "Common",
    combos: ["WEIRD"],
  },
  {
    name: "Bicycle",
    description: "For using only the bike structure set",
    rarity: "Rare",
    combos: ["WEIRD", "???"],
  },
  {
    name: "Angel",
    description: "For using a halo shaped part on the top of the rocket",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Wheel",
    description: "For using a wheel part",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Three-Leaf Clover",
    description: "For using 3 round parts in a three-leaf clover shape",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Cyclist",
    description: "For using 4 different bike parts",
    rarity: "Uncommon",
    combos: ["WEIRD"],
  },
  {
    name: "Penis",
    description: "unknown",
    rarity: "Viral",
    combos: [],
  },
  {
    name: "Full Bike",
    description: "For making a complete bike",
    rarity: "Rare",
    combos: ["WEIRD"],
  },
];

// Function to find combos by category
function findCombosByCategory(category: ComboCategory): Tag[] {
  return tags.filter((tag) => tag.combos.includes(category));
}

// Example usage
console.log(findCombosByCategory("CUTE"));
