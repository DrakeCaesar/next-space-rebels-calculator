import {
  createComboButton,
  createCountFilterButtons,
  createModeSwitchButton,
  createToggleColorsButton,
} from "./createButtons.js";
import "./styles.scss";
import { tags, tagsFromTheGame, UNKNOWN } from "./tags.js";
import { checkForDuplicateTags, uniqueCombos } from "./utils.js";

import toastr from "toastr"; // Import toastr for notifications

const hasDuplicate = checkForDuplicateTags(tags);

if (hasDuplicate) {
  toastr.error("Duplicate tag names found.", "Error");
} else {
  toastr.success("No duplicate tag names found.", "Success", {
    positionClass: "toast-bottom-right",
  });
}

if (!hasDuplicate) {
  console.log("No duplicate tag names found.");
}

tags.forEach((tag) => {
  let tagFromJson = tagsFromTheGame.find(
    (t) => t.name === tag.name || t.name === tag.altName,
  );
  if (tag.name === "Angel#1") {
    tagFromJson = tagsFromTheGame.find((t) => t.name === "Angel");
  }
  if (tag.name === "Angel#2") {
    tagFromJson = tagsFromTheGame.findLast((t) => t.name === "Angel");
  }

  if (tagFromJson) {
    // if (
    //   tag.description !==
    //   tagFromJson.description.replaceAll("‘", "'").replaceAll("’", "'")
    // ) {
    //   console.error(`
    //     Tag description mismatch: ${tag.name}\n
    //     Expected: ${tagFromJson.description}\n
    //     Actual:   ${tag.description}`);
    // }

    // tag.description = tagFromJson.description;
    tag.combos = tagFromJson.combos;
    // check if tag.combos are a subset of tagFromJson.combos
    const isSubset = tag.combos.every((combo) =>
      tagFromJson.combos.includes(combo),
    );

    if (!isSubset) {
      console.error(`Tag combos not a subset: ${tag.name}`);
    }
  } else {
    console.error(`Tag not found: ${tag.name}`);
  }
});

// Filter tags and create JSON content
let prunedTags = tags.filter((tag) => tag.combos.length > 1);
const json = JSON.stringify(prunedTags, null, 2);
console.log("tags.json saved");

downloadJSONFile("tags.json", json);

tags.forEach((tag) => {
  tag.combos.forEach((combo) => uniqueCombos.add(combo));
});

const sortedCombos = Array.from(uniqueCombos).sort();
sortedCombos.splice(sortedCombos.indexOf(UNKNOWN), 1);
sortedCombos.push(UNKNOWN);

function initializePage() {
  sortedCombos.forEach((combo) => {
    createComboButton(combo);
  });
  createModeSwitchButton();
  createToggleColorsButton();
  createCountFilterButtons();

  const searchBar = document.getElementById("search-bar") as HTMLInputElement;

  searchBar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const selectedTags = document.querySelectorAll(
        "#selected-tags > .tag",
      ) as NodeListOf<HTMLElement>;
      if (selectedTags.length < 5) {
        const tagSelector = document.querySelector(
          "#tags-list > .tag:not(.hidden)",
        ) as HTMLElement;
        tagSelector.click();
        searchBar.value = "";
      }
    }
  });
}

function downloadJSONFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

window.addEventListener("load", initializePage);
