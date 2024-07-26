export type TagRarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Viral";
export type ComboCategory =
  | "UNKNOWN"
  | "CUTE"
  | "AWESOME"
  | "NOOB"
  | "SMART"
  | "WEIRD"
  | "WILD"
  | "COOL"
  | "FUNNY"
  | "GROSS"
  | "NAUGHTY"
  | "CREEPY"
  | "ASPIRING"
  | "GEEKY";

export interface Tag {
  name: string;
  description: string;
  rarity: TagRarity;
  combos: ComboCategory[];
  blocked?: boolean;
}

export const tags: Tag[] = [
  {
    name: "Rocket Kit",
    description: "For using the rocket kit set",
    rarity: "Common",
    combos: ["NOOB"],
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
    combos: ["CUTE", "UNKNOWN"],
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
    combos: ["COOL"],
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
    combos: ["CUTE", "UNKNOWN"],
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
    combos: ["COOL", "UNKNOWN"],
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
    combos: ["CUTE", "UNKNOWN"],
  },
  {
    name: "Censored",
    description: "unknown",
    rarity: "Epic",
    combos: [],
    blocked: true,
  },
  {
    name: "Oops",
    description: "For hitting a building",
    rarity: "Uncommon",
    combos: ["NOOB", "UNKNOWN"],
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
    combos: ["AWESOME", "UNKNOWN"],
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
    combos: ["NOOB", "UNKNOWN"],
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
    combos: ["AWESOME"],
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
    combos: ["NOOB", "UNKNOWN"],
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
    combos: ["NOOB", "UNKNOWN"],
  },
  {
    name: "Tube",
    description: "For using a tube part",
    rarity: "Common",
    combos: ["SMART", "UNKNOWN"],
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
    combos: ["SMART"],
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
    combos: ["COOL"],
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
    combos: [],
    blocked: true,
  },
  {
    name: "Firecracker",
    description: "For using a firecracker",
    rarity: "Common",
    combos: ["AWESOME"],
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
    combos: [],
    blocked: true,
  },
  {
    name: "Architect",
    description: "For using every toy block",
    rarity: "Epic",
    combos: ["CUTE", "UNKNOWN"],
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
    combos: ["AWESOME", "UNKNOWN"],
  },
  {
    name: "Cocks",
    description: "unknown",
    rarity: "Epic",
    combos: [],
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
    combos: ["WILD"],
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
    combos: ["SMART"],
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
    combos: ["WEIRD", "UNKNOWN"],
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
    combos: ["WILD", "UNKNOWN"],
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
  {
    name: "Clogged",
    description: "For using a trash part and a PVC part",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Thunder Bird",
    description: "For using only the retro structure set",
    rarity: "Rare",
    combos: ["WILD", "UNKNOWN"],
  },
  {
    name: "Retro",
    description: "For using a retro part",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Walk",
    description: "For reaching a distance of 1 kilometer",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Steer",
    description: "For triggering swivel",
    rarity: "Uncommon",
    combos: ["SMART"],
  },
  {
    name: "Swivel",
    description: "For using a swivel",
    rarity: "Common",
    combos: ["SMART"],
  },
  {
    name: "Kinetic",
    description: "For using a kinetic part",
    rarity: "Common",
    combos: ["SMART"],
  },
  {
    name: "New Years Eve",
    description: "For using 9 different firework parts",
    rarity: "Epic",
    combos: ["SMART"],
  },
  {
    name: "Display",
    description: "For using 7 different mannequin parts",
    rarity: "Rare",
    combos: ["WEIRD", "UNKNOWN"],
  },
  {
    name: "Modular Body",
    description: "For using a head, a torso, two arms and two legs",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Head",
    description: "For using a head part",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Mannequin",
    description: "For using a mannequin part",
    rarity: "Common",
    combos: ["WEIRD"],
  },
  {
    name: "Torso",
    description: "For using a torso part",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Perv",
    description: "unknown",
    rarity: "Epic",
    combos: [],
    blocked: true,
  },
  {
    name: "Dandy Deer",
    description: "For using a deer part",
    rarity: "Common",
    combos: ["WEIRD", "WILD"],
  },
  {
    name: "Body",
    description: "For using a mannequin part and a Dandy Deer part",
    rarity: "Uncommon",
    combos: ["WEIRD", "UNKNOWN"],
  },
  {
    name: "Leg",
    description: "For using a leg part",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Tail Diversity",
    description: "For using 2 different tail parts",
    rarity: "Uncommon",
    combos: ["WILD", "AWESOME"],
  },
  {
    name: "Nose Job",
    description: "For using 2 different nose parts",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Blue",
    description: "For using 2 blue parts",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Bolt",
    description: "For reaching an altitude of 200 meters within 1 second",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Business",
    description: "For beating 'With Love From BangCo'",
    rarity: "Epic",
    combos: ["ASPIRING"],
  },
  {
    name: "Right on Time",
    description: "For triggering 3 different time sensors",
    rarity: "Rare",
    combos: ["SMART"],
  },
  {
    name: "Flower Power",
    description: "For using 3 different firework parts",
    rarity: "Rare",
    combos: ["AWESOME", "UNKNOWN"],
  },
  {
    name: "Pyromaniac",
    description: "For using 3 different firework parts",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Flash Mob",
    description: "For triggering 3 explosions",
    rarity: "Rare",
    combos: ["AWESOME"],
  },
  {
    name: "Industrial",
    description: "For using an industrial part",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Plane",
    description: "For reaching an altitude of 10 kilometers",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Trident",
    description:
      "For using 3 upward straight parts at roughly the same height that are not attached to each other",
    rarity: "Rare",
    combos: ["COOL"],
  },
  {
    name: "Juice",
    description: "For using 3 fuel parts",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Powerhouse",
    description: "For using 4 engines",
    rarity: "Epic",
    combos: ["SMART", "UNKNOWN"],
  },
  {
    name: "Sewer System",
    description: "For using 10 PVC parts and no other structure sets",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Motor",
    description: "For using 2 engines",
    rarity: "Rare",
    combos: ["SMART", "COOL"],
  },
  {
    name: "Birds",
    description: "For using a flamingo and a weathercock",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Diverse",
    description: "For using a nose, body and tai, all from different sets",
    rarity: "Rare",
    combos: ["AWESOME", "UNKNOWN"],
  },
  {
    name: "Pie",
    description: "For having a top altitude of 314 meters",
    rarity: "Viral",
    combos: [],
  },
  {
    name: "Family",
    description: "For beating a challenge from ScrapDad",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Winged",
    description: "For using 2 wing shaped parts",
    rarity: "Uncommon",
    combos: ["WILD"],
  },
  {
    name: "Double Kit",
    description: "For using a complete rocket kit set twice",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Noodle",
    description: "For having a pipe of at least 2 meter long",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Progress",
    description: "For beating a challenge from RoseWood",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Planking",
    description: "For beating 'Planking'",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "T-Bone",
    description: "For combining 2 rectangle shaped part to create a T shape",
    rarity: "Rare",
    combos: ["SMART"],
  },
  {
    name: "Plank",
    description: "For using a plank",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Wood",
    description: "For using the wood set",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Flat",
    description:
      "For having a rocket width at least 5 times bigger than its height",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Cross",
    description:
      "For combining 2 rectangle shaped part to create a cross shape",
    rarity: "Rare",
    combos: ["SMART"],
  },
  {
    name: "Tree",
    description: "For using only the wood structure set",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Minotaur",
    description:
      "For using a mannequin torso, arms and legs and a Dandy Deer head",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Timber",
    description: "For using a wood part and a mannequin part",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Techno",
    description: "For using a techno jet",
    rarity: "Rare",
    combos: ["COOL", "UNKNOWN"],
  },
  {
    name: "Pallet",
    description: "For using a pallet",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Spaghetti",
    description:
      "For having at least 3 pipes with a length of at least 2 meters",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Toy Magic",
    description: "For beating 'Toy Block Tower'",
    rarity: "Epic",
    combos: ["CUTE", "UNKNOWN"],
  },
  {
    name: "Mile",
    description: "For reaching an altitude of 1609 meters",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Horse",
    description: "For using a rocking horse",
    rarity: "Rare",
    combos: ["WILD", "CUTE"],
  },
  {
    name: "Gnome",
    description: "For combining a cone shaped part with a figure part",
    rarity: "Rare",
    combos: ["CUTE", "UNKNOWN"],
  },
  {
    name: "Chopsticks",
    description: "For using 2 toy sticks",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Cool",
    description: "For beating 'Too Cool For Pool'",
    rarity: "Epic",
    combos: [],
  },
  {
    name: "Zoo",
    description: "For using 3 different animal parts",
    rarity: "Rare",
    combos: ["WILD"],
  },
  {
    name: "Toy Magic",
    description: "For beating 'Toy Block Tower'",
    rarity: "Epic",
    combos: ["CUTE", "UNKNOWN"],
  },
  {
    name: "Mile",
    description: "For reaching an altitude of 1609 meters",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Horse",
    description: "For using a rocking horse",
    rarity: "Rare",
    combos: ["WILD", "CUTE"],
  },
  {
    name: "Gnome",
    description: "For combining a cone shaped part with a figure part",
    rarity: "Rare",
    combos: ["CUTE", "UNKNOWN"],
  },
  {
    name: "Zoo",
    description: "For using 3 different animal parts",
    rarity: "Rare",
    combos: ["WILD"],
  },
  {
    name: "Chopsticks",
    description: "For using 2 toy sticks",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Cool",
    description: "For beating 'Too Cool For Pool'",
    rarity: "Epic",
    combos: [],
  },
  {
    name: "Travel",
    description: "For reaching a distance of 10 kilometer",
    rarity: "Epic",
    combos: [],
  },
  {
    name: "Connector",
    description: "For beating 'Do a Split'",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Graffiti",
    description: "For using a graffiti can",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Astronaut",
    description: "For using a space shuttle",
    rarity: "Epic",
    combos: [],
  },
  {
    name: "BOOOM",
    description: "For beating 'Next Level'",
    rarity: "Epic",
    combos: ["AWESOME"],
  },
  {
    name: "Fire",
    description: "For exploding a Molotov cocktail",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Snail",
    description: "For not reaching a speed higher than 10 km/h",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Search",
    description: "unknown",
    rarity: "Rare",
    combos: [],
    blocked: true,
  },
  {
    name: "Crowd Control",
    description: "For having 5 different figure parts in the rocket",
    rarity: "Epic",
    combos: [],
  },
  {
    name: "Lit",
    description: "For using an industrial light",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Bot",
    description: "For using a robot",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Collage",
    description: "For using 5 different structure sets",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Christmas",
    description: "For using Dandy Deer and 10 different toy parts",
    rarity: "Epic",
    combos: [],
  },
  {
    name: "Sit",
    description: "For using a stool",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Diversity",
    description: "For using 10 different other parts",
    rarity: "Epic",
    combos: [],
  },
  {
    name: "Insect",
    description: "For using 6 limbs",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Wiper",
    description: "For using a windshield wiper",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Juggler",
    description: "For using 3 balls",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Trash King",
    description: "For using 8 different trash parts",
    rarity: "Epic",
    combos: [],
  },
  {
    name: "Vintage",
    description: "For using a toy part and a retro part",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Space Program",
    description: "For using a space shuttle and a moon rocket",
    rarity: "Epic",
    combos: ["GEEKY", "UNKNOWN"],
  },
  {
    name: "Moon",
    description: "For using a moon rocket",
    rarity: "Epic",
    combos: ["GEEKY"],
  },
  {
    name: "Clean",
    description: "For using a vacuum",
    rarity: "Common",
    combos: [],
  },
  {
    name: "Lightning",
    description: "For using an industrial light and a weathercock",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Woodpecker",
    description: "For using a bird and a wood part",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Internet",
    description: "For using a router",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Complicated",
    description: "For using at least 25 structure parts",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Flamingo",
    description: "For using a flamingo",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Doll",
    description: "For using a toy part and a mannequin part",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Mechanical",
    description: "For using a swivel and a robot",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Ass",
    description: "unknown",
    rarity: "Rare",
    combos: [],
    blocked: true,
  },
  {
    name: "Rot",
    description: "For using a trash part and a wood part",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Keyboard",
    description: "For using a keyboard",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Music",
    description: "For using a guitar",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Clamp",
    description: "For using a clamp",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Science",
    description: "For beating a challenge from dot_science",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Breakfast",
    description: "For using a toaster",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Blocky",
    description: "For using 3 cube shaped parts",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Flamingo",
    description: "For using a flamingo",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Doll",
    description: "For using a toy part and a mannequin part",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Mechanical",
    description: "For using a swivel and a robot",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Rot",
    description: "For using a trash part and a wood part",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Keyboard",
    description: "For using a keyboard",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Music",
    description: "For using a guitar",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Clamp",
    description: "For using a clamp",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Science",
    description: "For beating a challenge from dot_science",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Breakfast",
    description: "For using a toaster",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Blocky",
    description: "For using 3 cube shaped parts",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "StarTube",
    description: "For using a StarTube cap",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Discarded",
    description: "For using a toy part and a trash part",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Jolly",
    description: "For using a toy part and a Dandy Deer part",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Loud",
    description: "For using a megaphone",
    rarity: "Uncommon",
    combos: [],
  },
  {
    name: "Rock",
    description: "For using a guitar and a rocking horse",
    rarity: "Rare",
    combos: [],
  },
  {
    name: "Cock",
    description: "unknown",
    rarity: "Epic",
    combos: [],
    blocked: true,
  },
  {
    name: "Button",
    description: "For triggering a button sensor",
    rarity: "Common",
    combos: [],
  },
];
