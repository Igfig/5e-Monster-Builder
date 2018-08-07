import _ from "lodash";

import { TIER_THRESHOLDS } from "../constants";
import { callIfFunction } from "./misc";

//FIXME these no longer work as intended, and are probably redundant. Just use the monster's CR/tier, and _.sortedIndex()

/**
 * TODO docs
 *
 * @param cr
 * @param thresholds An array of pairs: [test, value].
 *  Test can be a boolean function or a number to test level against
 *  Value can be a function or a constant
 * @param fallback if none of the tests match
 */
export function chooseByCR(cr, thresholds, fallback = undefined) {
  const sorted = [...thresholds].sort(([t]) => -t); // sort with largest first
  // FIXME if a threshold test is a function, its sort order is not defined

  for (const [test, value] of sorted) {
    if (callIfFunction(test, cr, cr >= test)) {
      return callIfFunction(value, cr);
    }
  }
  if (fallback !== undefined) {
    return fallback;
  }

  throw new Error(`no valid values specified for level ${cr}: \n${thresholds}`);
}

/**
 *  TODO docs
 *
 * @param cr
 * @param tiers
 */
export function chooseByTier(cr, tiers) {
  const tierThresholds = TIER_THRESHOLDS.slice(0, tiers.length); // skip higher tiers if we weren't given four values
  // TODO handle case if 5+ tiers are given (incorrectly)

  return chooseByCR(cr, _.zip(tierThresholds, tiers));
}
