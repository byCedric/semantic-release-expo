"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expo_1 = require("./expo");
/**
 * Get the manifest files that needs to be updated from the configuration.
 * If this wasn't set, or is empty, the default manifest file will be returned.
 */
function getManifestFiles(config) {
    if (!config.manifests || config.manifests.length <= 0) {
        return [expo_1.MANIFEST_FILE];
    }
    return config.manifests;
}
exports.getManifestFiles = getManifestFiles;
/**
 * Get the template functions that builds the platform specific build numbers.
 */
function getVersionTemplates(config) {
    const template = config && config.versions;
    const fallback = typeof template === 'string' ? template : '${recommended}';
    return {
        android: (typeof template === 'object' && template.android) ? template.android : fallback,
        ios: (typeof template === 'object' && template.ios) ? template.ios : fallback,
        version: (typeof template === 'object' && template.version) ? template.version : fallback,
    };
}
exports.getVersionTemplates = getVersionTemplates;
/**
 * Get the full prepare configuration of the prepare step for this extension.
 * It's mostly used for the verify conditions step to inherit the configuration.
 */
function getPrepareConfig(context) {
    if (context.options && context.options.prepare) {
        const plugins = Array.isArray(context.options.prepare)
            ? context.options.prepare
            : [context.options.prepare];
        return plugins.find((config) => config.path && config.path === 'semantic-release-expo');
    }
}
exports.getPrepareConfig = getPrepareConfig;
/**
 * Inherit all configuration from the possible prepare step.
 * This makes sure we don't have to copy all settings when verifying.
 */
function inheritPrepareConfig(config, context) {
    const prepareConfig = getPrepareConfig(context) || {};
    return {
        manifests: config.manifests || prepareConfig.manifests,
    };
}
exports.inheritPrepareConfig = inheritPrepareConfig;
//# sourceMappingURL=config.js.map