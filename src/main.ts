import { TagRarity, tags } from "./tags";

const tagsContainer = document.getElementById("tags-container");
const comboButtonsContainer = document.getElementById(
  "combo-buttons-container",
);
const selectedTagsContainer = document.getElementById(
  "selected-tags-container",
);

const uniqueCombos = new Set<string>();

tags.forEach((tag) => {
  tag.combos.forEach((combo) => uniqueCombos.add(combo));
});

// Sort the combos alphabetically
const sortedCombos = Array.from(uniqueCombos).sort();
sortedCombos.splice(sortedCombos.indexOf("UNKNOWN"), 1);
sortedCombos.push("UNKNOWN");

// Create buttons for each unique combo
sortedCombos.forEach((combo) => {
  const button = document.createElement("button");
  button.textContent = combo.replace("UNKNOWN", "???");
  button.classList.add("combo-button");
  button.classList.add(combo);
  button.dataset.combo = combo;
  comboButtonsContainer?.appendChild(button);
});

const activeCombos = new Set<string>();
const selectedTags = new Set<string>();

// Add event listener to combo buttons
document.querySelectorAll(".combo-button").forEach((button) => {
  button.addEventListener("click", function (this: HTMLElement) {
    const combo = this.dataset.combo;
    this.classList.toggle("active");

    if (this.classList.contains("active")) {
      activeCombos.add(combo!);
    } else {
      activeCombos.delete(combo!);
    }

    filterTags();
    updateSelectedTagsDisplay();
  });
});

function filterTags() {
  document.querySelectorAll("#left-pane .tag").forEach((tag) => {
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
}

function updateSelectedTagsDisplay() {
  selectedTagsContainer!.innerHTML = "";

  const comboCount: { [key: string]: number } = {};
  const comboTags: { [key: string]: string[] } = {};

  selectedTags.forEach((tagId) => {
    const tagElement = document.getElementById(tagId);
    const clone = tagElement!.cloneNode(true) as HTMLElement;
    clone.classList.remove("selected");
    clone.classList.add("selected-clone");

    // Check if the tag is blocked and add the blocked class
    if (tagElement!.dataset.blocked === "true") {
      clone.classList.add("blocked");
    }

    selectedTagsContainer!.appendChild(clone);

    const tagCombos = Array.from(
      tagElement!.querySelectorAll(".tag-tooltip span:not(:first-of-type)"),
    ).map((span) => span.className);

    tagCombos.forEach((combo) => {
      comboCount[combo] = (comboCount[combo] || 0) + 1;
      if (!comboTags[combo]) {
        comboTags[combo] = [];
      }
      comboTags[combo].push(tagElement!.innerText.trim());
    });

    clone.addEventListener("click", function () {
      selectedTags.delete(tagId);
      tagElement!.classList.remove("selected");
      updateSelectedTagsDisplay();
    });

    // Hide the tooltip initially
    const tooltip = clone.querySelector(".tag-tooltip") as HTMLElement;
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";

    // Add event listeners for tooltip display on cloned tags
    clone.addEventListener("mousemove", function (e: MouseEvent) {
      tooltip.style.left = `${e.clientX + 10}px`;
      tooltip.style.top = `${e.clientY + 10}px`;
      tooltip.style.visibility = "visible";
      tooltip.style.opacity = "1";
    });

    clone.addEventListener("mouseleave", function () {
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = "0";
    });
  });

  // Sort tags by rarity (occurrence count)
  const sortedCombos = Object.entries(comboCount).sort((a, b) => a[1] - b[1]);

  const breakdown = document.createElement("div");
  breakdown.className = "combo-breakdown";

  const INDENT = "&nbsp;&nbsp;&nbsp;&nbsp;";
  const MULTIPLIER_INDENT = INDENT + INDENT;

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
        multiplier = 5;
      } else {
        return ""; // Skip if count does not match predefined conditions
      }

      const contributingTags = comboTags[combo].join(", ") + ",";

      return `
        ${INDENT}<span class="${combo} bold-text">${comboLabel}</span><span class="green-text"> ${contributingTags}</span><br>
        ${MULTIPLIER_INDENT}<span class=white-text>Combo multiplier =>  </span><span class="pink-text">x${multiplier}</span><br>
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
      if (count === 5) return 5; // Placeholder multiplier for count of 5
      return 1; // Default to 1 if no match
    });

  const totalMultiplier = multipliers.reduce((a: number, b) => a * b, 1);

  if (multipliers.length === 0) {
    breakdown.innerHTML = `
      <div class="console-output">
        <span class="yellow-text">Combos:</span><br>
        <span class="pink-text">No special combos found!</span>
      </div>
    `;

    selectedTagsContainer!.appendChild(breakdown);
    return;
  }

  breakdown.innerHTML = `
    <div class="console-output">
      <span class="yellow-text">Combos:</span><br>
      <span class="combo-output">${specialCombos}
      <span class="yellow-text">Total combo multiplier:</span><br>
      <span>${MULTIPLIER_INDENT}${multipliers.join(" * ")} = </span>
      <span class="pink-text">x${totalMultiplier}</span>
    </div>
  `;

  selectedTagsContainer!.appendChild(breakdown);
}

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
    updateSelectedTagsDisplay();
  });
});

// Create sort buttons
const buttonElement = document.querySelector(
  "#sort-buttons-container",
) as HTMLElement;

const sortByOrderButton = document.createElement("button");
sortByOrderButton.textContent = "Sort by Original Order";
sortByOrderButton.addEventListener("click", () => {
  sortTagsBy("order");
});
buttonElement.appendChild(sortByOrderButton);

const sortByRarityButton = document.createElement("button");
sortByRarityButton.textContent = "Sort by Rarity";
sortByRarityButton.addEventListener("click", () => {
  sortTagsBy("rarity");
});
buttonElement.appendChild(sortByRarityButton);

// Sorting function
function sortTagsBy(criteria: string) {
  const tagsArray = tagsContainer ? Array.from(tagsContainer.children) : [];
  if (criteria === "order") {
    tagsArray.sort((a: Element, b: Element) => {
      const orderA = parseInt((a as HTMLElement).dataset.order || "0");
      const orderB = parseInt((b as HTMLElement).dataset.order || "0");
      return orderA - orderB;
    });
  } else if (criteria === "rarity") {
    const rarityOrder = ["common", "uncommon", "rare", "epic", "legendary"];
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
