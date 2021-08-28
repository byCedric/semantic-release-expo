"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const semver_1 = require("semver");
const config_1 = require("./config");
const expo_1 = require("./expo");
/**
 * Calculate a numeric version code based on the next release and used expo version.
 * This uses the versioning specifically designed for Android version codes.
 *
 * @see https://medium.com/@maxirosson/versioning-android-apps-d6ec171cfd82
 */
exports.getVersionCode = (next, expo) => (expo.major * 10000000 + next.major * 10000 + next.minor * 100 + next.patch);
/**
 * Get the default (template) variables for all platforms.
 * This includes the recommended next release string and numeric version code.
 */
exports.getDefaultVariables = (meta, context) => {
    const expo = semver_1.coerce(meta.manifest.sdkVersion);
    const last = semver_1.coerce(context.lastRelease.version);
    const next = semver_1.coerce(context.nextRelease.version);
    return {
        code: (next && expo) ? exports.getVersionCode(next, expo) : '000000000',
        expo, last, next,
        recommended: context.nextRelease.version,
    };
};
/**
 * Calculate the (next) version for the "root" expo manifest version.
 * It's recommended to use the next release version string.
 */
exports.calculateVersion = (meta, config, context) => {
    const { version } = config_1.getVersionTemplates(config);
    return lodash_1.template(version)(Object.assign(Object.assign({}, exports.getDefaultVariables(meta, context)), { increment: (Number(meta.manifest.version) || 0) + 1 }));
};
/**
 * Calculate the (next) version for the android platform.
 * Although incremental numbers are supported, they are discouraged because of non-deterministic behaviour.
 * Its highly recommended to use the (calculatable) version code.
 */
exports.calculateAndroidVersion = (meta, config, context) => {
    const { android } = config_1.getVersionTemplates(config);
    const androidConfig = expo_1.getAndroidPlatform(meta.manifest);
    const variables = exports.getDefaultVariables(meta, context);
    return lodash_1.template(android)(Object.assign(Object.assign({}, variables), { increment: (Number(androidConfig.versionCode) || 0) + 1, recommended: variables.code }));
};
/**
 * Calculate the (next) version for the ios platform.
 * Although incremental numbers are supported, they are discouraged because of non-deterministic behaviour.
 * Its recommended to use the next release version string.
 */
exports.calculateIosVersion = (meta, config, context) => {
    const { ios } = config_1.getVersionTemplates(config);
    const iosConfig = expo_1.getIosPlatform(meta.manifest);
    return lodash_1.template(ios)(Object.assign(Object.assign({}, exports.getDefaultVariables(meta, context)), { increment: (Number(iosConfig.buildNumber) || 0) + 1 }));
};
//# sourceMappingURL=version.js.map