import { updateSelectedTagsDisplay } from "./displayUtils.ts";
import { Tag } from "./tags.ts";
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
    let tags = Array.from(tagsContainer.children).sort((a, b) => {
      const aTag = (a as HTMLElement).dataset.tag;
      const bTag = (b as HTMLElement).dataset.tag;

      const parsedATag: Tag = JSON.parse(aTag ?? "");
      const parsedBTag: Tag = JSON.parse(bTag ?? "");

      const aTextThird = parsedATag.combos[2] ?? "";
      const bTextThird = parsedBTag.combos[2] ?? "";

      const aTextSecond = parsedATag.combos[1] ?? "";
      const bTextSecond = parsedBTag.combos[1] ?? "";

      const aTextFirst = parsedATag.combos[0] ?? "";
      const bTextFirst = parsedBTag.combos[0] ?? "";

      // Sort by third combo first, then second, then first
      return (
        aTextFirst!.localeCompare(bTextFirst!) ||
        aTextSecond!.localeCompare(bTextSecond!) ||
        aTextThird!.localeCompare(bTextThird!)
      );
    });

    let lastSolidTagIndex = 0;
    let nextSolidTagIndex = 0;

    tags = tags.sort((a, b) => {
      nextSolidTagIndex
      
      
      const aTag = (a as HTMLElement).dataset.tag;
      const bTag = (b as HTMLElement).dataset.tag;

      const parsedATag: Tag = JSON.parse(aTag ?? "");
      const parsedBTag: Tag = JSON.parse(bTag ?? "");

      const aTextThird = parsedATag.combos[2] ?? "";
      const bTextThird = parsedBTag.combos[2] ?? "";

      const aTextSecond = parsedATag.combos[1] ?? "";
      const bTextSecond = parsedBTag.combos[1] ?? "";

      const aTextFirst = parsedATag.combos[0] ?? "";
      const bTextFirst = parsedBTag.combos[0] ?? "";
      let solid = parsedATag.combos.length === 1;

      if (solid) {
        lastSolidTagIndex = nextSolidTagIndex;
        nextSolidTagIndex++;
      }

      return (
        aTextFirst!.localeCompare(bTextFirst!) ||
        aTextSecond!.localeCompare(bTextSecond!) ||
        aTextThird!.localeCompare(bTextThird!)
      );
    });
    tagsContainer.innerHTML = "";
    tags.forEach((tag) => tagsContainer.appendChild(tag));
  });
  comboButtonsContainer?.appendChild(button);
}
