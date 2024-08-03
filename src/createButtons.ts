import { updateSelectedTagsDisplay } from "./displayUtils.ts";
import {
  activeCombos,
  comboButtonsContainer,
  filterTags,
  filterTagsByComboCount,
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
