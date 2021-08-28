"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const version_1 = require("../version");
const bumpVersion = (meta, config, context) => {
    const newVersion = version_1.calculateVersion(meta, config, context);
    context.logger.log('%s manifest version changed (%s => %s) in %s', 'Expo', meta.manifest.version, newVersion, meta.filename);
    return Object.assign(Object.assign({}, meta.manifest), { version: newVersion });
};
exports.default = bumpVersion;
//# sourceMappingURL=version.js.map