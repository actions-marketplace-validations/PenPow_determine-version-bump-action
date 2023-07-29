import core from '@actions/core';
import conventionalRecommendBump from 'conventional-recommended-bump';
import semver from 'semver';
try {
    if (!core.getInput)
        throw new Error("missing current version");
    conventionalRecommendBump({ preset: 'angular' }, (error, recommendation) => {
        if (error ?? !recommendation.releaseType)
            return core.setFailed(error ?? 'Could not determine version bump');
        core.setOutput("versionBump", recommendation.releaseType);
        core.setOutput("bumpedVersion", semver.inc(core.getInput("currentVersion"), recommendation.releaseType));
    });
}
catch (error) {
    core.setFailed(error);
}
//# sourceMappingURL=index.js.map