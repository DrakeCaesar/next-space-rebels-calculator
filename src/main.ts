import { tags } from "./tags";
import {
  comboButtonsContainer,
  filterTags,
  filterTagsByText,
  searchBar,
  sortTagsBy,
  tagsContainer,
  updateSelectedTagsDisplay,
} from "./utils";

const uniqueCombos = new Set<string>();

tags.forEach((tag) => {
  tag.combos.forEach((combo) => uniqueCombos.add(combo));
});

// Sort the combos alphabetically and exclude "UNKNOWN" from the main list
const sortedCombos = Array.from(uniqueCombos).sort();
sortedCombos.splice(sortedCombos.indexOf("UNKNOWN"), 1);
sortedCombos.push("UNKNOWN");

// Create buttons for each unique combo
sortedCombos.forEach((combo) => {
  const button = document.createElement("button");
  button.textContent = combo.replace("UNKNOWN", "???");
  button.classList.add("combo-button", combo);
  button.dataset.combo = combo;
  comboButtonsContainer?.appendChild(button);
});

const activeCombos = new Set<string>();
const selectedTags = new Set<string>();

// Assuming 'tags' is an array of tag objects
tags.forEach((tag, index) => {
  const tagElement = document.createElement("div");
  tagElement.className = `tag ${tag.rarity.toLowerCase()}`;
  tagElement.id = tag.name;
  tagElement.dataset.order = index.toFixed().toString(); // Store the original order
  tagElement.classList.add(tag.blocked ? "blocked" : "unblocked");
  tagElement.innerHTML = `
    ${tag.name}
    <div class="tag-tooltip">
      <strong>${tag.name}</strong><br>
      ${tag.description}<br>
      <span class="${tag.rarity.toLowerCase()}">${tag.rarity}</span><br>
      ${tag.combos
        .map(
          (combo) =>
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
});

// Sorting functionality

// Event listeners for sorting and search
document.getElementById("sort-by-order")?.addEventListener("click", () => {
  sortTagsBy("order", tagsContainer);
});

document.getElementById("sort-by-rarity")?.addEventListener("click", () => {
  sortTagsBy("rarity", tagsContainer);
});

searchBar.addEventListener("input", function () {
  const searchTerm = (this as HTMLInputElement).value.toLowerCase();
  filterTagsByText(activeCombos);
});

// Add event listener to position the tooltip
document.querySelectorAll(".tag").forEach((tag) => {
  (tag as HTMLElement).addEventListener("mousemove", function (e: MouseEvent) {
    const tooltip = tag.querySelector(".tag-tooltip") as HTMLElement;
    const tooltipWidth = tooltip.offsetWidth;
    const windowWidth = window.innerWidth;
    const scrollbarWidth = 20; // Adjust this value based on the scrollbar width
    let leftPosition = e.clientX + 10;

    // Check if the tooltip exceeds the right border of the window
    if (leftPosition + tooltipWidth > windowWidth - scrollbarWidth) {
      leftPosition = e.clientX - tooltipWidth - 10;
    }

    tooltip.style.left = `${leftPosition}px`;
    tooltip.style.top = `${e.clientY + 10}px`;
    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";
  });

  tag.addEventListener("mouseleave", function () {
    const tooltip = tag.querySelector(".tag-tooltip") as HTMLElement;
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
  });
});

document.querySelectorAll(".combo-button").forEach((button) => {
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
