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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const expo_1 = require("../expo");
const version_bumpers_1 = __importDefault(require("../version-bumpers"));
const SemanticReleaseError = require('@semantic-release/error');
/**
 * Prepare the new release by updating all manifests.
 * This should update at least the `version` using the next release version name.
 * It should also update the version code and build number when available.
 */
const prepare = (config, context) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield expo_1.readManifests(config_1.getManifestFiles(config));
    const writes = files.map((meta) => (expo_1.writeManifest(meta, version_bumpers_1.default(meta, config, context)).then(() => {
        context.logger.log('New %s manifest written for %s to %s', 'Expo', meta.manifest.name, meta.filename);
    })));
    try {
        yield Promise.all(writes);
    }
    catch (error) {
        expo_1.logManifestFromError(context, error);
        throw new SemanticReleaseError('Could not write Expo manifest(s)', 'EWRITEEXPOMANIFEST', error.message);
    }
    context.logger.log('Updated all %s manifests!', writes.length);
});
exports.default = prepare;
//# sourceMappingURL=prepare.js.map