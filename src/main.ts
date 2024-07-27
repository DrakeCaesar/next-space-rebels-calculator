import { tags } from "./tags";

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

// Create buttons for each unique combo
uniqueCombos.forEach((combo) => {
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
  button.addEventListener("click", function () {
    const combo = this.dataset.combo;
    this.classList.toggle("active");

    if (this.classList.contains("active")) {
      activeCombos.add(combo!);
    } else {
      activeCombos.delete(combo!);
    }

    filterTags();
  });
});

function filterTags() {
  document.querySelectorAll(".tag").forEach((tag) => {
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

  selectedTags.forEach((tagId) => {
    const tagElement = document.getElementById(tagId);
    const clone = tagElement!.cloneNode(true) as HTMLElement;
    clone.classList.remove("selected");
    clone.classList.add("selected-clone");
    selectedTagsContainer!.appendChild(clone);

    const tagCombos = Array.from(
      tagElement!.querySelectorAll(".tag-tooltip span:not(:first-of-type)"),
    ).map((span) => span.className);

    tagCombos.forEach((combo) => {
      comboCount[combo] = (comboCount[combo] || 0) + 1;
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

      return `
        ${INDENT}<span class="${combo}">${comboLabel}</span><br>
        ${MULTIPLIER_INDENT}Combo multiplier => <span class="pink-text">x${multiplier}</span><br>
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

  const totalMultiplier = multipliers.reduce((a, b) => a * b, 1);

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
      <span>${INDENT}${multipliers.join(" * ")} = </span>
      <span class="pink-text">x${totalMultiplier}</span>
    </div>
  `;

  selectedTagsContainer!.appendChild(breakdown);

  document.addEventListener("DOMContentLoaded", () => {
    const tagsToSelect = ["RaySon", "Powerhouse", "Motor", "Trident", "Juice"];

    tagsToSelect.forEach((tagText) => {
      const tagElement = Array.from(document.querySelectorAll(".tag")).find(
        (tag: HTMLElement) => tag.innerText === tagText,
      ) as HTMLElement;
      if (tagElement) {
        tagElement.click();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const tagsToSelect = ["RaySon", "Powerhouse", "Motor", "Trident", "Juice"];

  tagsToSelect.forEach((tagText) => {
    const tagElement = Array.from(document.querySelectorAll(".tag")).find(
      (tag: HTMLElement) => tag.innerText === tagText,
    ) as HTMLElement;
    if (tagElement) {
      tagElement.click();
    }
  });
});

tags.forEach((tag) => {
  const tagElement = document.createElement("div");
  tagElement.className = `tag ${tag.rarity.toLowerCase()}`;
  tagElement.id = tag.name;
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

// Add event listener to position the tooltip
document.querySelectorAll(".tag").forEach((tag) => {
  tag.addEventListener("mousemove", function (e: MouseEvent) {
    const tooltip = this.querySelector(".tag-tooltip") as HTMLElement;
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
    const tooltip = this.querySelector(".tag-tooltip") as HTMLElement;
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
  });
});
