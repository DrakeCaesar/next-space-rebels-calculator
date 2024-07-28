import { TagRarity, tags } from "./tags";
import { filterTags, updateSelectedTagsDisplay } from "./utils";

const tagsContainer = document.getElementById("tags-container");
const comboButtonsContainer = document.getElementById(
  "combo-buttons-container",
);
const selectedTagsElement = document.getElementById(
  "selected-tags",
) as HTMLDivElement;
const consoleElement = document.getElementById("console") as HTMLDivElement;

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
    updateSelectedTagsDisplay(
      selectedTagsElement,
      selectedTags,
      consoleElement,
    );
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

const rarityOrder: TagRarity[] = [
  "Viral",
  "Epic",
  "Rare",
  "Uncommon",
  "Common",
];

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
    updateSelectedTagsDisplay(
      selectedTagsElement,
      selectedTags,
      consoleElement,
    );
  });
});

// Sorting functionality
function sortTagsBy(criteria: string) {
  const tagsArray = tagsContainer ? Array.from(tagsContainer.children) : [];
  if (criteria === "order") {
    tagsArray.sort((a: Element, b: Element) => {
      const orderA = parseInt((a as HTMLElement).dataset.order || "0");
      const orderB = parseInt((b as HTMLElement).dataset.order || "0");
      return orderA - orderB;
    });
  } else if (criteria === "rarity") {
    const rarityOrder = ["viral", "epic", "rare", "uncommon", "common"];
    tagsArray.sort(
      (a, b) =>
        rarityOrder.indexOf(a.classList[1]) -
        rarityOrder.indexOf(b.classList[1]),
    );
  }
  if (tagsContainer) {
    tagsArray.forEach((tag) => tagsContainer.appendChild(tag)); // Re-append in sorted order
  }
}

// Event listeners for sorting and search
document.getElementById("sort-by-order")?.addEventListener("click", () => {
  sortTagsBy("order");
});

document.getElementById("sort-by-rarity")?.addEventListener("click", () => {
  sortTagsBy("rarity");
});

document.getElementById("search-bar")?.addEventListener("input", function () {
  const searchTerm = (this as HTMLInputElement).value.toLowerCase();
  filterTagsByText(searchTerm);
});

function filterTagsByText(searchTerm = "") {
  document.querySelectorAll("#tags-container .tag").forEach((tag) => {
    const tagCombos = Array.from(tag.querySelectorAll(".tag-tooltip span")).map(
      (span) => span.className,
    );

    const matchesCombo = Array.from(activeCombos).some((combo) =>
      tagCombos.includes(combo),
    );

    const matchesSearch = tag.textContent!.toLowerCase().includes(searchTerm);

    if ((activeCombos.size === 0 || matchesCombo) && matchesSearch) {
      tag.classList.remove("hidden");
    } else {
      tag.classList.add("hidden");
    }
  });
}

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
