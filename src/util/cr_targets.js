import { MAX_ABILITY_SCORE } from "../constants/misc";
import {chooseByLevel} from "./misc";

const MIN_LEVEL = -3;

// TODO unit test all this

// Some number targets for each level, that can't just be calculated.
// Note that the CRs 0 through 1/2 occupy positions -3 through 0, to make certain CR-modifying calculations easier to handle. Every CR of 1 or higher is offset 3 positions from its actual value.
// Therefore, try not to interact with this table directly. Only use the exported function further down.
const baseTargets = [
  // Target AC, target attack bonus, XP
  [12, 2, 0],   // 0
  [12, 2, 10],  // 1/8
  [13, 3, 25],  // 1/4
  [13, 3, 50],  // 1/2
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

const crCache = {};


/** get target values for each level
 * Calculates lazily.
 */
export default function crTargets(level) {
  // retrieve cached values, if present
  if (crCache.hasOwnProperty(level)) {
    return crCache[level];
  }
  
  const [ac, attack, xp] = baseTargets[level + MIN_LEVEL]; // MIN_LEVEL because baseTargets indexes starting from 0
  const levelName = 0 < level
    ? `${level}`
    : MIN_LEVEL < level
      ? `1/${Math.pow(2, level - 1)}`
      : "0";
    
  const targets = {
    name: levelName,
    ac: ac,
    attack: attack,
    minDamage: getMinDamage(level),
    minHp: getMinHp(level),
    maxDamage: getMaxDamage(level),
    maxHp: getMaxHp(level),
    xp: xp
  };
  
  // cache that
  crCache[level] = targets;
  return targets;
}

function getMaxDamage(level) {
  return chooseByLevel(level, [
    [-3, 1],
    [-2, 3],
    [-1, 5],
    [0, 8],
    [1, level => level * 6 + 8],
    [20, level => level * 18 - 220]
  ], 0);
  
  // if (level < -3) {
  //   return 0;
  // } else if (level === -3) {
  //   return 1;
  // } else if (level === -2) {
  //   return 3;
  // } else if (level === -1) {
  //   return 5;
  // } else if (level === 0) {
  //   return 8;
  // } else if (level < 20) {
  //   return level * 6 + 8;
  // } else if (level >= 20) {
  //   return level * 18 - 220;
  // }
  //
  // return 0; //we should never reach this point
}
function getMaxHp(level) {
  return chooseByLevel(level, [
    [-3, 20],
    [-2, 35],
    [-1, 49],
    [0, 70],
    [1, level => level * 15 + 70],
    [20, level => level * 45 - 500]
  ], 11);
  
  // if (level < -3) {
  //   return 11;
  // } else if (level === -3) {
  //   return 20; //RAW it's actually 6?
  // } else if (level === -2) {
  //   return 35;
  // } else if (level === -1) {
  //   return 49;
  // } else if (level === 0) {
  //   return 70;
  // } else if (level < 20) {
  //   return level * 15 + 70;
  // } else if (level >= 20) {
  //   return level * 45 - 500;
  // }
  //
  // return 0; //we should never reach this point
}
function getMinDamage(level) {
  return getMaxDamage(level - 1) + 1;
}
function getMinHp(level) {
  return getMaxHp(level - 1) + 1;
}


/*function getTargetDamage(level) {
  // XXX maybe this should be minDamage instead of average?
  if (level === -3) {
    return 1;
  }

  return Math.ceil((getMaxDamage(level) + getMaxDamage(level - 1)) / 2);
}

function getTargetHp(level) {
  if (level === -3) {
    return 16;
  } //RAW would be 4?

  return Math.ceil((getMaxHp(level) + getMaxHp(level - 1)) / 2);
}*/

function avgAbilityScore(level) {
  // XXX it's still a little weird that this function is even here, I feel like...
  if (level === -3) {
    level = -4; //looks weird, but that's just how the math works out
  }
  return Math.min(MAX_ABILITY_SCORE, Math.floor(level * 0.5 + 10.5));
}