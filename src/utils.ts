import { formatCombo, joinCombos } from "./comboUtils.ts";
import { isRestrictiveMode } from "./createButtons.ts";
import { updateSelectedTagsDisplay } from "./displayUtils.ts";
import { handleTagClick, handleTagMouseMove } from "./eventHandlers.ts";

export const tagsContainer = document.getElementById(
  "tags-list",
) as HTMLDivElement;
export const comboButtonsContainer = document.getElementById(
  "combo-buttons-container",
);
export const selectedTagsElement = document.getElementById(
  "selected-tags",
) as HTMLDivElement;
export const consoleElement: HTMLDivElement = document.getElementById(
  "console",
) as HTMLDivElement;

export const searchBar = document.getElementById(
  "search-bar",
) as HTMLInputElement;

export const uniqueCombos = new Set<string>();
export const activeCombos = new Set<string>();
export const selectedTags = new Set<string>();
export const sortedCombos = new Set<string>();

export function filterTags(activeCombos: Set<string>) {
  document.querySelectorAll("#tags-list .tag").forEach((tag) => {
    const tagCombos = Array.from(tag.querySelectorAll(".tag-tooltip span")).map(
      (span) => span.className,
    );

    let matches;
    if (isRestrictiveMode) {
      if (activeCombos.size > 1) {
        const matchCount = Array.from(activeCombos).filter((combo) =>
          tagCombos.includes(combo),
        ).length;
        matches = matchCount >= 2;
      } else {
        matches = Array.from(activeCombos).every((combo) =>
          tagCombos.includes(combo),
        );
      }
    } else {
      matches = Array.from(activeCombos).some((combo) =>
        tagCombos.includes(combo),
      );
    }

    if (activeCombos.size === 0 || matches) {
      tag.classList.remove("hiddenComboActive");
    } else {
      tag.classList.add("hiddenComboActive");
    }
  });
}

export function filterTagsByComboCount(count: number) {
  document.querySelectorAll("#tags-list .tag").forEach((tag) => {
    const tagCombos = Array.from(tag.querySelectorAll(".tag-tooltip span")).map(
      (span) => span.className,
    );

    if (tagCombos.length - 1 === count) {
      tag.classList.remove("hiddenComboCount");
    } else {
      tag.classList.add("hiddenComboCount");
    }
  });
}

export function positionTooltip(e: MouseEvent, tag: HTMLElement) {
  const tooltip = tag.querySelector(".tag-tooltip") as HTMLElement;

  let leftPosition = e.clientX + 10;
  let topPosition = e.clientY + 10;

  // Check if the tooltip exceeds the bottom border of the window
  if (topPosition + tooltip.offsetHeight > window.innerHeight) {
    topPosition = window.innerHeight - tooltip.offsetHeight - 10;
  }

  // Check if the tooltip exceeds the right border of the window
  if (leftPosition + tooltip.offsetWidth > window.innerWidth) {
    leftPosition = window.innerWidth - tooltip.offsetWidth - 10;
  }

  tooltip.style.left = `${leftPosition}px`;
  tooltip.style.top = `${topPosition}px`;
}

export function toggleAlternateTagColors() {
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tag.classList.toggle("alternate-colors");
  });
}

export function loadSelectedTagsFromLocalStorage(): void {
  const savedTags = localStorage.getItem("selectedTags");
  if (savedTags) {
    selectedTags.clear();
    for (const tag of JSON.parse(savedTags)) {
      selectedTags.add(tag);
    }
  }
}

export function sortTagsBy(criteria: string, tagsContainer: HTMLElement) {
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

export function filterTagsByText(activeCombos: Set<string>) {
  const searchTerm = searchBar.value.toLowerCase();

  (
    document.querySelectorAll("#tags-list .tag") as NodeListOf<HTMLElement>
  ).forEach((tag) => {
    const tagCombos = Array.from(tag.querySelectorAll(".tag-tooltip span")).map(
      (span) => span.className,
    );

    const matchesCombo = Array.from(activeCombos).some((combo) =>
      tagCombos.includes(combo),
    );

    const matchesSearch = tag.dataset.name?.toLowerCase().includes(searchTerm);

    if ((activeCombos.size === 0 || matchesCombo) && matchesSearch) {
      tag.classList.remove("hiddenComboText");
    } else {
      tag.classList.add("hiddenComboText");
    }
  });
}

export function createTagElement(tag: any, index: number) {
  const name = tag.name.split("#")[0];
  tag.combos.sort((a: string, b: string) => a.localeCompare(b));

  const tagElement = document.createElement("div");
  tagElement.className = `tag ${tag.rarity.toLowerCase()}`;
  tagElement.id = tag.name;
  tagElement.dataset.name = name;
  tagElement.dataset.order = index.toFixed().toString();
  tagElement.classList.add(tag.blocked ? "blocked" : "unblocked");
  tagElement.dataset.tag = JSON.stringify(tag);

  const leftName = `left-${formatCombo(tag.combos[0])}`;
  const middleName =
    tag.combos.length > 1 ? `middle-${formatCombo(tag.combos[1])}` : leftName;
  const rightName =
    tag.combos.length > 2 ? `right-${formatCombo(tag.combos[2])}` : middleName;

  tagElement.innerHTML += `
      ${name}
      <div class="tag-tooltip">
        <strong>${name}</strong><br>
        ${tag.description}<br>
        <span class="rarity ${tag.rarity.toLowerCase()}">${
    tag.rarity
  }</span><br>
        ${joinCombos(tag.combos)}
      </div>
    `;

  const classNames = new Set();
  tagElement.classList.add(...[leftName, middleName, rightName]);
  tagsContainer?.appendChild(tagElement);

  tagElement.addEventListener(
    "click",
    handleTagClick(tagElement, tag, selectedTags, updateSelectedTagsDisplay),
  );

  tagElement.addEventListener("mousemove", handleTagMouseMove(tagElement));
}

export function checkForDuplicateTags(tags: any[]): boolean {
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
    tag.combos.forEach((combo: string) => uniqueCombos.add(combo));
  });

  return hasDuplicate;
}
