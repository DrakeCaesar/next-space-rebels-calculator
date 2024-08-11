import { updateSelectedTagsDisplay } from "./displayUtils.ts";
import { ComboCategory, Tag } from "./tags.ts";
import {
  activeCombos,
  comboButtonsContainer,
  filterTags,
  filterTagsByComboCount,
  tagsContainer,
  toggleAlternateTagColors,
} from "./utils.ts";

export let isRestrictiveMode = true;

export function createModeSwitchButton() {
  const button = document.createElement("button");
  button.textContent = "Switch Mode";
  button.addEventListener("click", () => {
    isRestrictiveMode = !isRestrictiveMode;
    button.textContent = isRestrictiveMode
      ? "Switch to Additive Mode"
      : "Switch to Restrictive Mode";
    filterTags(activeCombos);
  });
  comboButtonsContainer?.appendChild(button);
}

export function createComboButton(combo: string) {
  const button = document.createElement("button");
  button.textContent = combo;
  button.classList.add("combo-button", combo.toLowerCase());
  button.dataset.combo = combo.toLowerCase();
  comboButtonsContainer?.appendChild(button);

  button.addEventListener("click", function (this: HTMLElement) {
    const combo = this.dataset.combo;
    this.classList.toggle("active");

    if (this.classList.contains("active")) {
      activeCombos.add(combo!);
    } else {
      activeCombos.delete(combo!);
    }

    filterTags(activeCombos);
    updateSelectedTagsDisplay();
  });
}
export function createToggleColorsButton() {
  const button = document.createElement("button");
  button.textContent = "Toggle Alternate Tag Colors";
  button.classList.add("toggle-colors-button");
  button.addEventListener("click", toggleAlternateTagColors);
  comboButtonsContainer?.appendChild(button);
}
export function createCountFilterButtons() {
  for (let i = 2; i <= 3; i++) {
    const button = document.createElement("button");
    button.textContent = `Filter by ${i} Combos`;
    button.addEventListener("click", () => {
      filterTagsByComboCount(i);
    });
    comboButtonsContainer?.appendChild(button);
  }
}

export function createSortButton() {
  const button = document.createElement("button");
  button.textContent = "Sort Tags";
  button.classList.add("sort-button");

  button.addEventListener("click", () => {
    const comboList = [
      "ASPIRING",
      "AWESOME",
      "COOL",
      "CREEPY",
      "CUTE",
      "FUNNY",
      "GEEKY",
      "GROSS",
      "NAUGHTY",
      "NOOB",
      "SMART",
      "WEIRD",
      "WILD",
    ];

    // loop through the comboList and log number of tags with each combo
    comboList.forEach((combo) => {
      const tagsWithCombo = Array.from(tagsContainer.children).filter((tag) =>
        (tag as HTMLElement).dataset.tag?.includes(combo),
      );
      console.log(combo, tagsWithCombo.length);
    });

    const pairCombosLengths = [];

    for (let i = 0; i < comboList.length; i++) {
      for (let j = i + 1; j < comboList.length; j++) {
        const combo1 = comboList[i] as ComboCategory;
        const combo2 = comboList[j] as ComboCategory;
        const tagsWithBothCombos = Array.from(tagsContainer.children).filter(
          (tag) => {
            const tagData = JSON.parse(
              (tag as HTMLElement).dataset.tag as string,
            ) as Tag;
            return (
              tagData.combos.includes(combo1) && tagData.combos.includes(combo2)
            );
          },
        );

        if (tagsWithBothCombos.length > 0) {
          pairCombosLengths.push({
            combo1,
            combo2,
            length: tagsWithBothCombos.length,
          });
        }
      }
    }

    // Sort by length in descending order
    pairCombosLengths.sort((a, b) => b.length - a.length);

    // Print the sorted pair combos
    pairCombosLengths.forEach(({ combo1, combo2, length }) => {
      console.log(combo1, combo2, length);
    });

    const trioCombosLengths = [];

    for (let i = 0; i < comboList.length; i++) {
      for (let j = i + 1; j < comboList.length; j++) {
        for (let k = j + 1; k < comboList.length; k++) {
          const combo1 = comboList[i] as ComboCategory;
          const combo2 = comboList[j] as ComboCategory;
          const combo3 = comboList[k] as ComboCategory;
          const tagsWithAllCombos = Array.from(tagsContainer.children).filter(
            (tag) => {
              const tagData = JSON.parse(
                (tag as HTMLElement).dataset.tag as string,
              ) as Tag;
              return (
                tagData.combos.includes(combo1) &&
                tagData.combos.includes(combo2) &&
                tagData.combos.includes(combo3)
              );
            },
          );

          if (tagsWithAllCombos.length > 0) {
            trioCombosLengths.push({
              combo1,
              combo2,
              combo3,
              length: tagsWithAllCombos.length,
            });
          }
        }
      }
    }

    // Sort by length in descending order
    trioCombosLengths.sort((a, b) => b.length - a.length);

    // Print the sorted trio combos
    trioCombosLengths.forEach(({ combo1, combo2, combo3, length }) => {
      console.log(combo1, combo2, combo3, length);
    });

    const priorityOrder = comboList.flatMap((combo, index, array) => [
      // current only
      (combos: string[]) => combos.length == 1 && combos[0] == combo,

      // next combo is any but second
      (combos: string[]) =>
        combos[0] == combo && index + 1 < array.length
          ? combos[1] != array[index + 1]
          : false,

      // next combo is second and have 3 combos
      (combos: string[]) =>
        combos.length == 3 && combos[0] == combo && index + 1 < array.length
          ? combos[1] == array[index + 1]
          : false,

      // next combo is second and have 2 combos
      (combos: string[]) =>
        combos.length == 2 && combos[0] == combo && index + 1 < array.length
          ? combos[1] == array[index + 1]
          : false,

      // next combo is third
      (combos: string[]) =>
        combos[0] == combo && index + 2 < array.length
          ? combos[2] == array[index + 1]
          : false,
    ]);

    let tags = Array.from(tagsContainer.children).sort((a, b) => {
      const aTag = (a as HTMLElement).dataset.tag;
      const bTag = (b as HTMLElement).dataset.tag;

      const parsedATag: Tag = JSON.parse(aTag ?? "");
      const parsedBTag: Tag = JSON.parse(bTag ?? "");

      const getPriority = (combos: string[]): number => {
        for (let i = 0; i < priorityOrder.length; i++) {
          if (priorityOrder[i](combos)) {
            return i;
          }
        }
        return priorityOrder.length; // Lowest priority if no match
      };

      const aPriority = getPriority(parsedATag.combos);
      const bPriority = getPriority(parsedBTag.combos);

      // Sort by priority first, then lexicographically if priorities are the same
      return (
        aPriority - bPriority ||
        parsedATag.combos.join("").localeCompare(parsedBTag.combos.join(""))
      );
    });

    tagsContainer.innerHTML = "";
    tags.forEach((tag) => tagsContainer.appendChild(tag));
  });

  comboButtonsContainer?.appendChild(button);
}
