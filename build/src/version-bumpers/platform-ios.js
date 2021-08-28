"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expo_1 = require("../expo");
const version_1 = require("../version");
const bumpPlatformIos = (meta, config, context) => {
    const ios = expo_1.getIosPlatform(meta.manifest);
    const newVersion = version_1.calculateIosVersion(meta, config, context);
    context.logger.log('%s manifest ios version changed (%s => %s) in %s', 'Expo', ios.buildNumber, newVersion, meta.filename);
    return Object.assign(Object.assign({}, meta.manifest), { ios: Object.assign(Object.assign({}, ios), { buildNumber: newVersion }) });
};
exports.default = bumpPlatformIos;
//# sourceMappingURL=platform-ios.js.map