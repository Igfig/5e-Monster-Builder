export function formatBonus(bonus) {
  return bonus < 0 ? bonus.toString() : `+${bonus}`;
}

export function wordsToConstantName(value) {
  return value.toUpperCase().replace(" ", "_");
}
