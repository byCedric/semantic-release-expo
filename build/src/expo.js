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
const detect_indent_1 = __importDefault(require("detect-indent"));
const detect_newline_1 = __importDefault(require("detect-newline"));
const fs_extra_1 = require("fs-extra");
/**
 * The name of the default Expo manifest file.
 */
exports.MANIFEST_FILE = "app.json";
/**
 * The default indentation to use when no indentation is found.
 */
exports.DEFAULT_INDENT = "  ";
/**
 * The default newline character to use when no existing was detected.
 */
exports.DEFAULT_NEWLINE = "\n";
/**
 * Log information about the manifest which is related to the error.
 */
function logManifestFromError(context, error) {
    if (error && error.expo) {
        context.logger.log("Error encountered for %s manifest %s", "Expo", error.expo);
    }
}
exports.logManifestFromError = logManifestFromError;
/**
 * Read the Expo manifest content and return the parsed JSON.
 */
function readManifest(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isNewAppConfig = filename.includes("config.js");
            const content = isNewAppConfig
                ? require(filename)
                : yield fs_extra_1.readFile(filename, "utf8");
            const manifest = isNewAppConfig ? content : JSON.parse(content).expo;
            return { filename, content, manifest };
        }
        catch (error) {
            error.expo = filename;
            throw error;
        }
    });
}
exports.readManifest = readManifest;
/**
 * Read a list of Expo mannifest files and return the parsed JSON.
 */
function readManifests(filenames) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Promise.all(filenames.map(readManifest));
    });
}
exports.readManifests = readManifests;
/**
 * Write new content to the Expo manifest file, keeping indentation intact.
 */
function writeManifest(meta, manifest) {
    return __awaiter(this, void 0, void 0, function* () {
        const { indent } = detect_indent_1.default(meta.content) || { indent: exports.DEFAULT_INDENT };
        const newline = detect_newline_1.default(meta.content) || exports.DEFAULT_NEWLINE;
        yield fs_extra_1.writeJson(meta.filename, { expo: manifest }, { spaces: indent, EOL: newline });
    });
}
exports.writeManifest = writeManifest;
/**
 * Get the platforms from a loaded manifest.
 * This will fallback to the default from Expo itself.
 */
function getPlatforms(manifest) {
    return manifest.platforms || ["android", "ios"];
}
exports.getPlatforms = getPlatforms;
/**
 * Get the platform settings for Android, if available.
 */
function getAndroidPlatform(manifest) {
    return manifest.android || { versionCode: 0 };
}
exports.getAndroidPlatform = getAndroidPlatform;
/**
 * Get the platform settings for iOS, if available.
 */
function getIosPlatform(manifest) {
    return manifest.ios || { buildNumber: "" };
}
exports.getIosPlatform = getIosPlatform;
//# sourceMappingURL=expo.js.map