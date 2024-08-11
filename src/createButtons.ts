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
    const priorityOrder = [
      (combos: string[]) => combos.length === 1 && combos.includes("ASPIRING"), // Aspiring only
      (combos: string[]) =>
        combos.includes("ASPIRING") && !combos.includes("AWESOME"), // Aspiring but not Awesome
      (combos: string[]) =>
        combos.includes("AWESOME") && !combos.includes("ASPIRING"), // Awesome but not Aspiring

      (combos: string[]) => combos.length === 1 && combos.includes("AWESOME"), // Awesome only
      (combos: string[]) =>
        combos.includes("AWESOME") && !combos.includes("COOL"), // Awesome but not Cool
      (combos: string[]) =>
        combos.includes("COOL") && !combos.includes("AWESOME"), // Cool but not Awesome

      (combos: string[]) => combos.length === 1 && combos.includes("COOL"), // Cool only
      (combos: string[]) =>
        combos.includes("COOL") && !combos.includes("CREEPY"), // Cool but not Creepy
      (combos: string[]) =>
        combos.includes("CREEPY") && !combos.includes("COOL"), // Creepy but not Cool

      (combos: string[]) => combos.length === 1 && combos.includes("CREEPY"), // Creepy only
      (combos: string[]) =>
        combos.includes("CREEPY") && !combos.includes("CUTE"), // Creepy but not Cute
      (combos: string[]) =>
        combos.includes("CUTE") && !combos.includes("CREEPY"), // Cute but not Creepy

      (combos: string[]) => combos.length === 1 && combos.includes("CUTE"), // Cute only
      (combos: string[]) =>
        combos.includes("CUTE") && !combos.includes("FUNNY"), // Cute but not Funny
      (combos: string[]) =>
        combos.includes("FUNNY") && !combos.includes("CUTE"), // Funny but not Cute

      // Continue this pattern for the rest of the list...
      (combos: string[]) => combos.length === 1 && combos.includes("FUNNY"),
      (combos: string[]) =>
        combos.includes("FUNNY") && !combos.includes("GEEKY"),
      (combos: string[]) =>
        combos.includes("GEEKY") && !combos.includes("FUNNY"),

      (combos: string[]) => combos.length === 1 && combos.includes("GEEKY"),
      (combos: string[]) =>
        combos.includes("GEEKY") && !combos.includes("GROSS"),
      (combos: string[]) =>
        combos.includes("GROSS") && !combos.includes("GEEKY"),

      (combos: string[]) => combos.length === 1 && combos.includes("GROSS"),
      (combos: string[]) =>
        combos.includes("GROSS") && !combos.includes("NAUGHTY"),
      (combos: string[]) =>
        combos.includes("NAUGHTY") && !combos.includes("GROSS"),

      (combos: string[]) => combos.length === 1 && combos.includes("NAUGHTY"),
      (combos: string[]) =>
        combos.includes("NAUGHTY") && !combos.includes("NOOB"),
      (combos: string[]) =>
        combos.includes("NOOB") && !combos.includes("NAUGHTY"),

      (combos: string[]) => combos.length === 1 && combos.includes("NOOB"),
      (combos: string[]) =>
        combos.includes("NOOB") && !combos.includes("SMART"),
      (combos: string[]) =>
        combos.includes("SMART") && !combos.includes("NOOB"),

      (combos: string[]) => combos.length === 1 && combos.includes("SMART"),
      (combos: string[]) =>
        combos.includes("SMART") && !combos.includes("WEIRD"),
      (combos: string[]) =>
        combos.includes("WEIRD") && !combos.includes("SMART"),

      (combos: string[]) => combos.length === 1 && combos.includes("WEIRD"),
      (combos: string[]) =>
        combos.includes("WEIRD") && !combos.includes("WILD"),
      (combos: string[]) =>
        combos.includes("WILD") && !combos.includes("WEIRD"),

      (combos: string[]) => combos.length === 1 && combos.includes("WILD"), // Wild only
    ];

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
