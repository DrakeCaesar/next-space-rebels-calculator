import { tags } from "./tags";

const tagsContainer = document.getElementById("tags-container");
const comboButtonsContainer = document.getElementById(
  "combo-buttons-container",
);

const uniqueCombos = new Set<string>();
tags.forEach((tag) => {
  tag.combos.forEach((combo) => uniqueCombos.add(combo));
});

// Create buttons for each unique combo
uniqueCombos.forEach((combo) => {
  const button = document.createElement("button");
  button.className = "combo-button";
  button.textContent = combo.replace("UNKNOWN", "???");
  button.dataset.combo = combo;
  comboButtonsContainer?.appendChild(button);
});

const activeCombos = new Set<string>();

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

tags.forEach((tag) => {
  const tagElement = document.createElement("div");
  tagElement.className = `tag ${tag.rarity.toLowerCase()}`;
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
});

// Add event listener to position the tooltip
document.querySelectorAll(".tag").forEach((tag) => {
  tag.addEventListener("mousemove", function (e: MouseEvent) {
    const tooltip = this.querySelector(".tag-tooltip");
    tooltip.style.left = `${e.clientX + 10}px`;
    tooltip.style.top = `${e.clientY + 10}px`;
    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";
  });

  tag.addEventListener("mouseleave", function () {
    const tooltip = this.querySelector(".tag-tooltip");
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
  });
});
