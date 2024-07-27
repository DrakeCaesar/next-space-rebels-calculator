import { tags } from "./tags";

const tagsContainer = document.getElementById("tags-container");

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

  // Add event listener to position the tooltip
  tagElement.addEventListener("mousemove", function (e: MouseEvent) {
    const tooltip = this.querySelector(".tag-tooltip") as HTMLDivElement;
    tooltip.style.left = `${e.clientX + 10}px`;
    tooltip.style.top = `${e.clientY + 10}px`;
    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";
  });

  tagElement.addEventListener("mouseleave", function () {
    const tooltip = this.querySelector(".tag-tooltip") as HTMLDivElement;
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
  });
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
