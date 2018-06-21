import { MAX_ABILITY_SCORE, MIN_CR } from "../constants";
import { chooseByCR } from "./choosers";

// TODO unit test all this

// Some number targets for each cr, that can't just be calculated.
// Note that the CRs 0 through 1/2 occupy positions -3 through 0, to make certain CR-modifying calculations easier to handle. Every CR of 1 or higher is offset 3 positions from its actual value.
// Therefore, try not to interact with this table directly. Only use the exported function further down.
const baseTargets = [
  // Target AC, target attack bonus, XP
  [12, 2, 0], // 0
  [12, 2, 10], // 1/8
  [13, 3, 25], // 1/4
  [13, 3, 50], // 1/2
  [13, 3, 100], // 1
  [13, 3, 200], // 2
  [13, 3, 450], // etc
  [13, 4, 700],
  [14, 5, 1100],
  [15, 6, 1800],
  [15, 6, 2300],
  [15, 6, 2900],
  [16, 7, 3900],
  [16, 7, 5000],
  [17, 7, 5900],
  [17, 8, 7200],
  [17, 8, 8400],
  [18, 8, 10000],
  [18, 8, 11500],
  [18, 8, 13000],
  [18, 9, 15000],
  [19, 10, 18000],
  [19, 10, 20000],
  [19, 10, 22000],
  [19, 10, 25000],
  [19, 11, 33000],
  [19, 11, 41000],
  [19, 11, 50000],
  [19, 12, 62000],
  [19, 12, 75000],
  [19, 12, 90000],
  [19, 13, 105000],
  [19, 13, 120000],
  [19, 13, 135000],
  [19, 14, 155000]
];

const crValuesCache = {};

/**
 * TODO docs
 *
 * Note: lazy evaluation with caching.
 */
export function targetValuesForCR(cr) {
  // retrieve cached values, if present
  if (crValuesCache.hasOwnProperty(cr)) {
    return crValuesCache[cr];
  }

  const [ac, attack, xp] = baseTargets[cr + MIN_CR]; // MIN_CR because baseTargets indexes starting from 0
  const crLabel =
    1 <= cr
      ? `${cr}` // if CR is 1 or higher, display it straight
      : MIN_CR < cr
        ? `1/${Math.pow(2, cr - 1)}` // 1/8, 1/4, or 1/2 as appropriate
        : "0"; // 0 or less is 0

  const targets = {
    label: crLabel, // XXX hm this isn't technically a target value... should we change the function name?
    ac: ac,
    attack: attack,
    damage: { min: getMinDamage(cr), max: getMaxDamage(cr) },
    hp: { min: getMinHp(cr), max: getMaxHp(cr) },
    abilityScore: { avg: getAvgAbilityScore(cr), max: getMaxAbilityScore(cr) },
    xp: xp
  };

  // cache that
  crValuesCache[cr] = targets;
  return targets;
}

function getMaxDamage(cr) {
  return chooseByCR(
    cr,
    [[-3, 1], [-2, 3], [-1, 5], [0, 8], [1, cr => cr * 6 + 8], [20, cr => cr * 18 - 220]],
    0
  );
}
function getMaxHp(cr) {
  return chooseByCR(
    cr,
    [[-3, 20], [-2, 35], [-1, 49], [0, 70], [1, cr => cr * 15 + 70], [20, cr => cr * 45 - 500]],
    11
  );
}
function getMinDamage(cr) {
  return getMaxDamage(cr - 1) + 1;
}
function getMinHp(cr) {
  return getMaxHp(cr - 1) + 1;
}

function getAvgAbilityScore(cr) {
  if (cr === -3) {
    cr = -4; //looks weird, but that's just how the math works out
  }
  return Math.min(MAX_ABILITY_SCORE, Math.floor(cr * 0.5 + 10.5));
}

function getMaxAbilityScore(cr) {
  return Math.min(MAX_ABILITY_SCORE, getAvgAbilityScore(cr) + 5);
}
