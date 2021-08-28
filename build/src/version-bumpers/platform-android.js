"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expo_1 = require("../expo");
const version_1 = require("../version");
const bumpPlatformAndroid = (meta, config, context) => {
    const android = expo_1.getAndroidPlatform(meta.manifest);
    const newVersion = parseInt(version_1.calculateAndroidVersion(meta, config, context), 10);
    context.logger.log('%s manifest android version changed (%s => %s) in %s', 'Expo', android.versionCode, newVersion, meta.filename);
    return Object.assign(Object.assign({}, meta.manifest), { android: Object.assign(Object.assign({}, android), { versionCode: newVersion }) });
};
exports.default = bumpPlatformAndroid;
//# sourceMappingURL=platform-android.js.map