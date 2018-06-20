import _ from 'lodash';
import { TIER_LEVELS } from "../constants/misc";

export function callIfFunction(func, value, fallback=func) {
  if (!!func && "function" === typeof func) {
    return func(value);
  }
  return fallback;
}

/**
 *
 * @param level
 * @param thresholds An array of pairs: [test, value].
 *  Test can be a boolean function or a number to test level against
 *  Value can be a function or a constant
 * @param fallback if none of the tests match
 */
export function chooseByLevel(level, thresholds, fallback=undefined) {
  const sorted = [...thresholds].sort(([t]) => -t); // sort with largest first
  // FIXME if a threshold test is a function, its sort order is not defined
  
  for ([test, value] of sorted) {
    if (callIfFunction(test, level, level >= test)) {
      return callIfFunction(value, level);
    }
  }
  if (fallback !== undefined) { return fallback; }
  
  throw new Error(`no valid values specified for level ${level}: \n${thresholds}`)
}

export function chooseByTier(level, tiers) {
  const tierLevels = TIER_LEVELS.slice(0, tiers.length); // skip higher tiers if we weren't given four values
  // TODO handle case if 5+ tiers are given (incorrectly)
  
  return chooseByLevel(level, _.zip(tierLevels, tiers));
}
