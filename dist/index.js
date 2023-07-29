import core, { toPlatformPath } from '@actions/core';
import conventionalRecommendBump from 'conventional-recommended-bump';
import { readFileSync } from 'fs';
import semver from 'semver';
try {
    conventionalRecommendBump({ preset: 'angular' }, (error, recommendation) => {
        if (error ?? !recommendation.releaseType)
            return core.setFailed(error ?? 'Could not determine version bump');
        console.log(import.meta.url);
        const currentVersion = readFileSync(toPlatformPath("../../package.json"), "utf-8");
        const pkg = JSON.parse(currentVersion);
        if (!pkg.version)
            return core.setFailed("No version field in package.json");
        core.setOutput("versionBump", recommendation.releaseType);
        core.setOutput("bumpedVersion", semver.inc(pkg.version, recommendation.releaseType));
    });
}
catch (error) {
    core.setFailed(error);
}
//# sourceMappingURL=index.js.map