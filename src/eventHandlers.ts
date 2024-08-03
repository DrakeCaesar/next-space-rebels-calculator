import { positionTooltip } from "./utils.ts";

export function handleTagClick(
  tagElement: HTMLElement,
  tag: any,
  selectedTags: Set<string>,
  updateSelectedTagsDisplay: () => void,
) {
  return function () {
    if (selectedTags.has(tag.name)) {
      selectedTags.delete(tag.name);
      tagElement.classList.remove("selected");
    } else if (selectedTags.size < 5) {
      selectedTags.add(tag.name);
      tagElement.classList.add("selected");
    }
    updateSelectedTagsDisplay();
  };
}

export function handleTagMouseMove(tagElement: HTMLElement) {
  return function (e: MouseEvent) {
    positionTooltip(e, tagElement);
  };
}
