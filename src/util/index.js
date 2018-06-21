// XXX we should be able to use this format here, but CommonJS doesn't like it. Nicer during development, as long as you don't run any tests.
// export * from "./misc";
// export * from "./choosers";
// export * from "./cr_targets";

// XXX have to use this format for testing. TODO can we use one or the other depending on environment?
import * as misc from "./misc";
import * as choosers from "./choosers";
import * as targets from "./cr_targets";

module.exports = { ...misc, ...choosers, ...targets };
