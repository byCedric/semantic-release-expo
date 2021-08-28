import { Context } from "./types";
/**
 * A manifest-light definition to use for typehinting.
 *
 * @todo Replace with `@types/expo` when react-native and node console issue is resolved
 */
export interface Manifest {
    name: string;
    version?: string;
    platforms?: string[];
    android?: {
        versionCode: string | number;
    };
    ios?: {
        buildNumber: string;
    };
    [propName: string]: any;
}
/**
 * A small manifest description object to include filenames.
 * This is required when reading mulitple manifests to keep track of the filenames.
 */
export interface ManifestMeta {
    filename: string;
    content: string;
    manifest: Manifest;
}
/**
 * The name of the default Expo manifest file.
 */
export declare const MANIFEST_FILE = "app.json";
/**
 * The default indentation to use when no indentation is found.
 */
export declare const DEFAULT_INDENT = "  ";
/**
 * The default newline character to use when no existing was detected.
 */
export declare const DEFAULT_NEWLINE = "\n";
/**
 * Log information about the manifest which is related to the error.
 */
export declare function logManifestFromError(context: Context, error: any): void;
/**
 * Read the Expo manifest content and return the parsed JSON.
 */
export declare function readManifest(filename: string): Promise<ManifestMeta>;
/**
 * Read a list of Expo mannifest files and return the parsed JSON.
 */
export declare function readManifests(filenames: string[]): Promise<ManifestMeta[]>;
/**
 * Write new content to the Expo manifest file, keeping indentation intact.
 */
export declare function writeManifest(meta: ManifestMeta, manifest: Manifest): Promise<void>;
/**
 * Get the platforms from a loaded manifest.
 * This will fallback to the default from Expo itself.
 */
export declare function getPlatforms(manifest: Manifest): string[];
/**
 * Get the platform settings for Android, if available.
 */
export declare function getAndroidPlatform(manifest: Manifest): {
    versionCode: string | number;
};
/**
 * Get the platform settings for iOS, if available.
 */
export declare function getIosPlatform(manifest: Manifest): {
    buildNumber: string;
};
