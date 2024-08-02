import "./styles.scss";
import { tags, UNKNOWN } from "./tags.ts";
import {
  activeCombos,
  checkForDuplicateTags,
  createComboButton,
  createModeSwitchButton,
  createTagElement,
  createToggleColorsButton,
  filterTagsByText,
  loadSelectedTagsFromLocalStorage,
  sortTagsBy,
  tagsContainer,
  uniqueCombos,
  updateSelectedTagsDisplay,
} from "./utils.ts";

import toastr from "toastr"; // Import toastr for notifications

const hasDuplicate = checkForDuplicateTags(tags);

if (hasDuplicate) {
  toastr.error("Duplicate tag names found.", "Error");
} else {
  toastr.success("No duplicate tag names found.", "Success", {
    positionClass: "toast-bottom-right",
  });
}

if (!hasDuplicate) {
  console.log("No duplicate tag names found.");
}

tags.forEach((tag) => {
  tag.combos.forEach((combo) => uniqueCombos.add(combo));
});

const sortedCombos = Array.from(uniqueCombos).sort();
sortedCombos.splice(sortedCombos.indexOf(UNKNOWN), 1);
sortedCombos.push(UNKNOWN);

function initializePage() {
  sortedCombos.forEach((combo) => {
    createComboButton(combo);
  });
  createModeSwitchButton();
  createToggleColorsButton();

  const searchBar = document.getElementById("search-bar") as HTMLInputElement;

  searchBar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const selectedTags = document.querySelectorAll(
        "#selected-tags > .tag",
      ) as NodeListOf<HTMLElement>;
      if (selectedTags.length < 5) {
        const tagSelector = document.querySelector(
          "#tags-list > .tag:not(.hidden)",
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
