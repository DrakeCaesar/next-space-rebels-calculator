import { tags, tagsFromTheGame } from "./tags.ts";

export function formatCombo(combo: string): string {
  return combo.toLowerCase().replace("???", "unknown");
}

export function joinCombos(combos: any[]): string {
  if (combos.length === 2) {
    return combos
      .map(
        (combo: string) =>
          `<span class="${formatCombo(combo)}">${combo}</span>`,
      )
      .join(" and ");
  } else if (combos.length === 3) {
    return `${combos
      .slice(0, 2)
      .map(
        (combo: string) =>
          `<span class="${formatCombo(combo)}">${combo}</span>`,
      )
      .join(", ")} and <span class="${formatCombo(combos[2])}">${
      combos[2]
    }</span>`;
  } else {
    return combos
      .map(
        (combo: string) =>
          `<span class="${formatCombo(combo)}">${combo}</span>`,
      )
      .join(", ");
  }
}

function loadCombosFromJson() {
  tags.forEach((tag) => {
    let tagFromJson = tagsFromTheGame.find(
      (t) => t.name === tag.name || t.name === tag.altName,
    );
    if (tag.name === "Angel#1") {
      tagFromJson = tagsFromTheGame.find((t) => t.name === "Angel");
    }
    if (tag.name === "Angel#2") {
      tagFromJson = tagsFromTheGame.findLast((t) => t.name === "Angel");
    }

    if (tagFromJson) {
      // if (
      //   tag.description !==
      //   tagFromJson.description.replaceAll("‘", "'").replaceAll("’", "'")
      // ) {
      //   console.error(`
      //     Tag description mismatch: ${tag.name}\n
      //     Expected: ${tagFromJson.description}\n
      //     Actual:   ${tag.description}`);
      // }

      // tag.description = tagFromJson.description;
      tag.combos = tagFromJson.combos;
      // check if tag.combos are a subset of tagFromJson.combos
      const isSubset = tag.combos.every((combo) =>
        tagFromJson.combos.includes(combo),
      );

      if (!isSubset) {
        console.error(`Tag combos not a subset: ${tag.name}`);
      }
    } else {
      console.error(`Tag not found: ${tag.name}`);
    }
  });
}
