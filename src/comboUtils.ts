export function formatCombo(combo: string): string {
  return combo.toLowerCase().replace("???", "unknown");
}

export function joinCombos(combos: any[]): string {
  if (combos.length === 2) {
    return combos
      .map(
        (combo: string) =>
          `<span class="${formatCombo(combo)}">${combo}</span>`,
      )
      .join(" and ");
  } else if (combos.length === 3) {
    return `${combos
      .slice(0, 2)
      .map(
        (combo: string) =>
          `<span class="${formatCombo(combo)}">${combo}</span>`,
      )
      .join(", ")} and <span class="combo ${formatCombo(combos[2])}">${
      combos[2]
    }</span>`;
  } else {
    return combos
      .map(
        (combo: string) =>
          `<span class="${formatCombo(combo)}">${combo}</span>`,
      )
      .join(", ");
  }
}
