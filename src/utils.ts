export const tagsContainer = document.getElementById(
  "tags-container",
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
  document.querySelectorAll("#tags-container .tag").forEach((tag) => {
    const tagCombos = Array.from(tag.querySelectorAll(".tag-tooltip span")).map(
      (span) => span.className,
    );

    const matches = Array.from(activeCombos).some((combo) =>
      tagCombos.includes(combo),
    );

    if (activeCombos.size === 0 || matches) {
      tag.classList.remove("hidden");
    } else {
      tag.classList.add("hidden");
    }
  });
  filterTagsByText(activeCombos);
}

export function positionTooltip(e: MouseEvent, tag: HTMLElement) {
  const tooltip = tag.querySelector(".tag-tooltip") as HTMLElement;

  const tooltipWidth = tooltip.offsetWidth;
  const windowWidth = window.innerWidth;
  let leftPosition = e.clientX + 10;

  // Check if the tooltip exceeds the right border of the window
  if (leftPosition + tooltipWidth > windowWidth) {
    leftPosition = e.clientX - tooltipWidth - 10;
  }

  tooltip.style.left = `${leftPosition}px`;
  tooltip.style.top = `${e.clientY + 10}px`;
}

export function updateSelectedTagsDisplay(selectedTags: Set<string>) {
  selectedTagsElement!.innerHTML = "";

  const comboCount: { [key: string]: number } = {};
  const comboTags: { [key: string]: string[] } = {};

  selectedTags.forEach((tagId) => {
    const tagElement = document.getElementById(tagId);
    if (tagElement) {
      const clone = tagElement.cloneNode(true) as HTMLElement;
      clone.classList.remove("selected");
      clone.classList.add("selected-clone");

      if (tagElement.dataset.blocked === "true") {
        clone.classList.add("blocked");
      }

      selectedTagsElement!.appendChild(clone);

      const tagName =
        tagElement.querySelector("strong")?.innerText.trim() ||
        tagElement.innerText.trim();
      const tagCombos = Array.from(
        tagElement.querySelectorAll(".tag-tooltip span:not(:first-of-type)"),
      ).map((span) => span.className);

      tagCombos.forEach((combo) => {
        comboCount[combo] = (comboCount[combo] || 0) + 1;
        if (!comboTags[combo]) {
          comboTags[combo] = [];
        }
        comboTags[combo].push(tagName);
      });

      clone.addEventListener("click", function () {
        selectedTags.delete(tagId);
        tagElement.classList.remove("selected");
        updateSelectedTagsDisplay(selectedTags);
      });

      clone.addEventListener("mousemove", function (e: MouseEvent) {
        positionTooltip(e, clone);
      });
    }
  });

  const indent4 = "&nbsp;&nbsp;&nbsp;&nbsp;";
  const indent8 = indent4 + indent4;

  const specialCombos = Object.entries(comboCount)
    .map(([combo, count]) => {
      if (combo === "UNKNOWN") {
        return "";
      }

      let comboLabel = "";
      let multiplier = 1;

      if (count === 2) {
        comboLabel = `${combo} COMBO`;
        multiplier = 2;
      } else if (count === 3) {
        comboLabel = `SUPER ${combo} COMBO`;
        multiplier = 5;
      } else if (count === 4) {
        comboLabel = `MEGA ${combo} COMBO`;
        multiplier = 15;
      } else if (count === 5) {
        comboLabel = `ULTRA ${combo} COMBO`; // Placeholder for future use
        multiplier = 30;
      } else {
        return ""; // Skip if count does not match predefined conditions
      }

      const contributingTags = comboTags[combo].join(", ") + ",";

      return `
        ${indent4}<span class="${combo} bold-text">${comboLabel}</span><span class="green-text"> ${contributingTags}</span><br>
        ${indent8}<span class=white-text>Combo multiplier =>  </span><span class="pink-text">x${multiplier}</span><br>
      `;
    })
    .join("");

  // Filter out "UNKNOWN" combos and map the actual multipliers
  const multipliers = Object.entries(comboCount)
    .filter(([combo, count]) => combo !== "UNKNOWN" && count > 1)
    .map(([_, count]) => {
      if (count === 2) return 2;
      if (count === 3) return 5;
      if (count === 4) return 15;
      if (count === 5) return 30; // Placeholder multiplier for count of 5
      return 1; // Default to 1 if no match
    });

  const totalMultiplier = multipliers.reduce((a: number, b) => a * b, 1);

  if (multipliers.length === 0) {
    consoleElement.innerHTML = `
      <div class="console-output">
        <span class="yellow-text">Combos:</span><br>
        <span class="pink-text">No special combos found!</span>
      </div>
    `;

    return;
  }

  const totalComboMultiplierText =
    multipliers.length === 1
      ? ""
      : `
    <span class="yellow-text">Total combo multiplier:</span><br>
    <span>${indent8}${multipliers.join(" * ")} = </span>
    <span class="pink-text">x${totalMultiplier}</span>`;

  consoleElement.innerHTML = `
    <div class="console-output">
      <span class="yellow-text">Combos:</span><br>
      <span class="combo-output">${specialCombos}
      ${totalComboMultiplierText}
    </div>
  `;
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
    document.querySelectorAll("#tags-container .tag") as NodeListOf<HTMLElement>
  ).forEach((tag) => {
    const tagCombos = Array.from(tag.querySelectorAll(".tag-tooltip span")).map(
      (span) => span.className,
    );

    const matchesCombo = Array.from(activeCombos).some((combo) =>
      tagCombos.includes(combo),
    );

    const matchesSearch = tag.dataset.name?.toLowerCase().includes(searchTerm);

    if ((activeCombos.size === 0 || matchesCombo) && matchesSearch) {
      tag.classList.remove("hidden");
    } else {
      tag.classList.add("hidden");
    }
  });
}

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
  const name = tag.name.split("#")[0];

  const tagElement = document.createElement("div");
  tagElement.className = `tag ${tag.rarity.toLowerCase()}`;
  tagElement.id = tag.name;
  tagElement.dataset.name = name;
  tagElement.dataset.order = index.toFixed().toString();
  tagElement.classList.add(tag.blocked ? "blocked" : "unblocked");
  tagElement.innerHTML = `
    ${name}
    <div class="tag-tooltip">
      <strong>${name}</strong><br>
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
