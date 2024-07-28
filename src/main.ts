import { tags } from "./tags";
import {
  activeCombos,
  createComboButton,
  createTagElement,
  filterTagsByText,
  searchBar,
  sortTagsBy,
  tagsContainer,
  uniqueCombos,
} from "./utils";

tags.forEach((tag) => {
  tag.combos.forEach((combo) => uniqueCombos.add(combo));
});

const sortedCombos = Array.from(uniqueCombos).sort();
sortedCombos.splice(sortedCombos.indexOf("UNKNOWN"), 1);
sortedCombos.push("UNKNOWN");

function initializePage() {
  sortedCombos.forEach((combo) => {
    createComboButton(combo);
  });

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
