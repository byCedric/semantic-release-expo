"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const expo_1 = require("../expo");
const SemanticReleaseError = require('@semantic-release/error');
/**
 * Verify the configuration of this plugin.
 * This checks if all Expo manifests are readable.
 */
const verifyConditions = (config, context) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyConfig = config_1.inheritPrepareConfig(config, context);
    try {
        (yield expo_1.readManifests(config_1.getManifestFiles(verifyConfig))).forEach((meta) => {
            context.logger.log('Found %s manifest for %s in %s', 'Expo', meta.manifest.name, meta.filename);
        });
    }
    catch (error) {
        expo_1.logManifestFromError(context, error);
        throw new SemanticReleaseError('Could not load Expo manifest(s).', 'EINVALIDEXPOMANIFEST', error.message);
    }
});
exports.default = verifyConditions;
//# sourceMappingURL=verify-conditions.js.map