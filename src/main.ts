import { tags, UNKNOWN } from "./tags";
import {
  activeCombos,
  createComboButton,
  createTagElement,
  filterTagsByText,
  sortTagsBy,
  tagsContainer,
  uniqueCombos,
} from "./utils";

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
    const tagsToSelect = ["RaySon", "Powerhouse", "Motor", "Trident", "Juice"];
    // const tagsToSelect = [
    //   "Sizzle",
    //   "Dynamite",
    //   "Looping",
    //   "Pyromaniac",
    //   "Flash Mob",
    // ];

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
