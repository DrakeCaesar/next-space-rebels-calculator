import { tags, UNKNOWN } from "./tags";
import {
  activeCombos,
  createComboButton,
  createTagElement,
  filterTagsByText,
  loadSelectedTagsFromLocalStorage,
  sortTagsBy,
  tagsContainer,
  uniqueCombos,
  updateSelectedTagsDisplay,
} from "./utils";

let hasDuplicate = false;
const tagMap = new Map<string, any>();
tags.forEach((tag) => {
  if (tagMap.has(tag.name)) {
    console.log(`Duplicate tag name found: ${tag.name}`);
    console.log("First occurrence:", tagMap.get(tag.name));
    console.log("Duplicate occurrence:", tag);
    hasDuplicate = true;
  } else {
    tagMap.set(tag.name, tag);
  }
  tag.combos.forEach((combo) => uniqueCombos.add(combo));
});

if (!hasDuplicate) {
  console.log("No duplicate tag names found.");
}

const sortedCombos = Array.from(uniqueCombos).sort();
sortedCombos.splice(sortedCombos.indexOf(UNKNOWN), 1);
sortedCombos.push(UNKNOWN);

function initializePage() {
  sortedCombos.forEach((combo) => {
    createComboButton(combo);
  });

  const searchBar = document.getElementById("search-bar") as HTMLInputElement;

  searchBar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const selectedTags = document.querySelectorAll(
        "#selected-tags > .tag",
      ) as NodeListOf<HTMLElement>;
      if (selectedTags.length < 5) {
        const tagSelector = document.querySelector(
          "#tags-container > .tag:not(.hidden)",
        ) as HTMLElement;
        tagSelector.click();
        searchBar.value = "";
        filterTagsByText(activeCombos);
      }
    }
  });
  searchBar.placeholder = `Search ${tags.length} tags...`;

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
    loadSelectedTagsFromLocalStorage();
    updateSelectedTagsDisplay();
  });
}

initializePage();
