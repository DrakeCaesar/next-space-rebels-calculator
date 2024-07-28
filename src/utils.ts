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
  selectedTags: Set<string>,
  selectedTagsElement: HTMLElement | null,
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
        updateSelectedTagsDisplay(selectedTags, selectedTagsElement);
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
}
