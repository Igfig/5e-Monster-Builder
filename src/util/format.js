export function formatBonus(bonus) {
  return bonus < 0 ? bonus.toString() : `+${bonus}`;
}

export function wordsToConstantName(value) {
  return value.toUpperCase().replace(" ", "_");
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + name.slice(1);
}
