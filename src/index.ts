import axios from "axios";
import {
  createComboButton,
  createCountFilterButtons,
  createModeSwitchButton,
  createSortButton,
  createToggleColorsButton,
} from "./createButtons.js";
import { updateSelectedTagsDisplay } from "./displayUtils.js";
import "./styles.scss";
import { Tag, tags, tagsFromTheGame, UNKNOWN } from "./tags.js";
import {
  activeCombos,
  checkForDuplicateTags,
  createTagElement,
  filterTagsByText,
  loadSelectedTagsFromLocalStorage,
  selectedTags,
  sortTagsBy,
  tagsContainer,
  uniqueCombos,
} from "./utils.js";

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

let prunedTags = tags.filter((tag) => tag.combos.length > 1);
const json = JSON.stringify(prunedTags, null, 2);
const combos = sendJsonToBackend(json);
combos.then((data) => {
  if (!data) {
    return;
  }
  selectedTags.clear();
  for (const combo of data) {
    selectedTags.add(combo.name);
  }
  updateSelectedTagsDisplay();
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
  createSortButton();

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
        filterTagsByText(activeCombos);
      }
    }
  });
  searchBar.placeholder = `Search ${tags.length} tags...`;

  tags.forEach((tag, index) => {
    createTagElement(tag, index);
  });

  document.getElementById("sort-by-order")?.addEventListener("click", () => {
    sortTagsBy("order", tagsContainer);
  });

  document.getElementById("sort-by-rarity")?.addEventListener("click", () => {
    sortTagsBy("rarity", tagsContainer);
  });

  searchBar.addEventListener("input", function () {
    filterTagsByText(activeCombos);
  });

  loadSelectedTagsFromLocalStorage();
  updateSelectedTagsDisplay();

  const sortButtonElement = document.querySelector(
    ".sort-button",
  ) as HTMLElement;
  sortButtonElement.click();

  const toggleclassListButtonElement = document.querySelector(
    ".toggle-colors-button",
  ) as HTMLElement;
  toggleclassListButtonElement.click();
}

window.addEventListener("load", initializePage);

async function sendJsonToBackend(jsonData: string): Promise<Tag[] | null> {
  console.time("sendJsonToBackend");
  try {
    const response = await axios.post(
      "http://localhost:3000/process",
      jsonData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data as Tag[];
  } catch (error) {
    console.error("Error sending data to backend:", error);
    return null;
  } finally {
    console.timeEnd("sendJsonToBackend");
  }
}
