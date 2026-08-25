// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// What the footer advertises: which version of this site you are looking at.
//
// WHY THIS EXISTS
// On 2026-08-25 the Workers Builds Git connection had silently dropped and
// production served a seven-day-old build. Nothing on the page said so, and
// telling "today's deploy" from "the one from a week ago" took ten minutes of
// probing URLs. A build that cannot say what it is forces that every time.
//
// NEITHER VALUE IS WRITTEN BY HAND.
//   version -> web/package.json, read at build time
//   sha     -> WORKERS_CI_COMMIT_SHA, injected by Workers Builds
//              (developers.cloudflare.com/workers/ci-cd/builds/configuration/
//               "system environment variables ... injected by default")
//
// Local builds have no SHA. That is normal, not an error: it degrades to "dev"
// rather than failing the build, because a developer running `astro dev`
// should not need CI variables present.
import pkg from "../../package.json";

/** Semver from package.json. The one place the number is maintained. */
export const VERSION: string = `v${pkg.version}`;

/** Short commit SHA of the build, or "dev" when built outside Workers Builds. */
export const COMMIT_SHA: string = (() => {
  const sha =
    import.meta.env.WORKERS_CI_COMMIT_SHA ??
    process.env.WORKERS_CI_COMMIT_SHA ??
    "";
  return sha ? sha.slice(0, 7) : "dev";
})();

/** True when the SHA is real and can be linked to a commit on GitHub. */
export const HAS_SHA: boolean = COMMIT_SHA !== "dev";

/** The commit this build came from, when known. */
export const COMMIT_URL: string | null = HAS_SHA
  ? `https://github.com/numengames/numinia-nwos/commit/${COMMIT_SHA}`
  : null;

/** What the footer prints: "v0.0.1 · a1b2c3d". */
export const BUILD_LABEL: string = `${VERSION} · ${COMMIT_SHA}`;
