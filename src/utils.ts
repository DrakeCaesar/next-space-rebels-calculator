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
}

export function updateSelectedTagsDisplay(
  selectedTagsElement: HTMLElement,
  selectedTags: Set<string>,
  consoleElement: HTMLElement,
) {
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
        updateSelectedTagsDisplay(
          selectedTagsElement,
          selectedTags,
          consoleElement,
        );
      });

      const tooltip = clone.querySelector(".tag-tooltip") as HTMLElement;
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = "0";

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
    }
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
        multiplier = 30;
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
    consoleElement.innerHTML = `
      <div class="console-output">
        <span class="yellow-text">Combos:</span><br>
        <span class="pink-text">No special combos found!</span>
      </div>
    `;

    selectedTagsElement!.appendChild(breakdown);
    return;
  }

  consoleElement.innerHTML = `
    <div class="console-output">
      <span class="yellow-text">Combos:</span><br>
      <span class="combo-output">${specialCombos}
      <span class="yellow-text">Total combo multiplier:</span><br>
      <span>${MULTIPLIER_INDENT}${multipliers.join(" * ")} = </span>
      <span class="pink-text">x${totalMultiplier}</span>
    </div>
  `;

  selectedTagsElement!.appendChild(breakdown);
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

export function filterTagsByText(searchTerm = "", activeCombos: Set<string>) {
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
