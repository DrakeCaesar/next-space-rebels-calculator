import { UNKNOWN } from "./tags.ts";
import {
  consoleElement,
  positionTooltip,
  selectedTags,
  selectedTagsElement,
} from "./utils.ts";

export function updateSelectedTagsDisplay() {
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
        updateSelectedTagsDisplay();
      });

      clone.addEventListener("mousemove", function (e: MouseEvent) {
        positionTooltip(e, clone);
      });
    }
  });
  localStorage.setItem(
    "selectedTags",
    JSON.stringify(Array.from(selectedTags)),
  );

  const indent4 = "&nbsp;&nbsp;&nbsp;&nbsp;";
  const indent8 = indent4 + indent4;

  const specialCombos = Object.entries(comboCount)
    .map(([combo, count]) => {
      if (combo === UNKNOWN) {
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
    .filter(([combo, count]) => combo !== UNKNOWN && count > 1)
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
