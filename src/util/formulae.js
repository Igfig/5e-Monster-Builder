export function calcProfBonus(cr) {
  return Math.max(2, Math.ceil(cr / 4) + 1);
}
