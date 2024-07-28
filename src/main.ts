import { tags } from "./tags";
import {
  comboButtonsContainer,
  filterTags,
  filterTagsByText,
  positionTooltip,
  searchBar,
  sortTagsBy,
  tagsContainer,
  updateSelectedTagsDisplay,
} from "./utils";

const uniqueCombos = new Set<string>();
const activeCombos = new Set<string>();
const selectedTags = new Set<string>();

tags.forEach((tag) => {
  tag.combos.forEach((combo) => uniqueCombos.add(combo));
});

const sortedCombos = Array.from(uniqueCombos).sort();
sortedCombos.splice(sortedCombos.indexOf("UNKNOWN"), 1);
sortedCombos.push("UNKNOWN");

export function createComboButton(combo: string) {
  const button = document.createElement("button");
  button.textContent = combo.replace("UNKNOWN", "???");
  button.classList.add("combo-button", combo);
  button.dataset.combo = combo;
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
    updateSelectedTagsDisplay(selectedTags);
  });
}

export function createTagElement(tag: any, index: number) {
  const tagElement = document.createElement("div");
  tagElement.className = `tag ${tag.rarity.toLowerCase()}`;
  tagElement.id = tag.name;
  tagElement.dataset.order = index.toFixed().toString();
  tagElement.classList.add(tag.blocked ? "blocked" : "unblocked");
  tagElement.innerHTML = `
    ${tag.name}
    <div class="tag-tooltip">
      <strong>${tag.name}</strong><br>
      ${tag.description}<br>
      <span class="${tag.rarity.toLowerCase()}">${tag.rarity}</span><br>
      ${tag.combos
        .map(
          (combo: string) =>
            `<span class="${combo}">${combo.replace("UNKNOWN", "???")}</span>`,
        )
        .join(", ")}
    </div>
  `;
  tagsContainer?.appendChild(tagElement);

  tagElement.addEventListener("click", function () {
    if (selectedTags.has(tag.name)) {
      selectedTags.delete(tag.name);
      tagElement.classList.remove("selected");
    } else if (selectedTags.size < 5) {
      selectedTags.add(tag.name);
      tagElement.classList.add("selected");
    }
    updateSelectedTagsDisplay(selectedTags);
  });

  tagElement.addEventListener("mousemove", function (e: MouseEvent) {
    positionTooltip(e, tagElement);
  });
}

function initializePage() {
  sortedCombos.forEach(createComboButton);

  tags.forEach((tag, index) => {
    createTagElement(tag, index);
  });

  document.getElementById("sort-by-order")?.addEventListener("click", () => {
    sortTagsBy("order", tagsContainer);
  });

  document.getElementById("sort-by-rarity")?.addEventListener("click", () => {
    sortTagsBy("rarity", tagsContainer);
  });

  searchBar.addEventListener("input", function () {
    filterTagsByText(activeCombos);
  });

  document.addEventListener("DOMContentLoaded", () => {
    const tagsToSelect = ["RaySon", "Powerhouse", "Motor", "Trident", "Juice"];

    tagsToSelect.forEach((tagText) => {
      const tagElement = Array.from(document.querySelectorAll(".tag")).find(
        (tag) => (tag as HTMLElement).innerText === tagText,
      ) as HTMLElement;
      if (tagElement) {
        tagElement.click();
      }
    });
  });
}

initializePage();
