import detectIndent from "detect-indent";
import detectNewline from "detect-newline";
import { readFile, writeJson } from "fs-extra";
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
	android?: { versionCode: string | number };
	ios?: { buildNumber: string };
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
export const MANIFEST_FILE = "app.json";

/**
 * The default indentation to use when no indentation is found.
 */
export const DEFAULT_INDENT = "  ";

/**
 * The default newline character to use when no existing was detected.
 */
export const DEFAULT_NEWLINE = "\n";

/**
 * Log information about the manifest which is related to the error.
 */
export function logManifestFromError(context: Context, error: any) {
	if (error && error.expo) {
		context.logger.log(
			"Error encountered for %s manifest %s",
			"Expo",
			error.expo
		);
	}
}

/**
 * Read the Expo manifest content and return the parsed JSON.
 */
export async function readManifest(filename: string): Promise<ManifestMeta> {
	try {
		const isNewAppConfig = filename.includes("config.js");

		const content = isNewAppConfig
			? require(filename)
			: await readFile(filename, "utf8");
		const manifest = isNewAppConfig ? content : JSON.parse(content).expo;

		return { filename, content, manifest };
	} catch (error) {
		error.expo = filename;
		throw error;
	}
}

/**
 * Read a list of Expo mannifest files and return the parsed JSON.
 */
export async function readManifests(
	filenames: string[]
): Promise<ManifestMeta[]> {
	return await Promise.all(filenames.map(readManifest));
}

/**
 * Write new content to the Expo manifest file, keeping indentation intact.
 */
export async function writeManifest(meta: ManifestMeta, manifest: Manifest) {
	const { indent } = detectIndent(meta.content) || { indent: DEFAULT_INDENT };
	const newline = detectNewline(meta.content) || DEFAULT_NEWLINE;

	await writeJson(
		meta.filename,
		{ expo: manifest },
		{ spaces: indent, EOL: newline }
	);
}

/**
 * Get the platforms from a loaded manifest.
 * This will fallback to the default from Expo itself.
 */
export function getPlatforms(manifest: Manifest) {
	return manifest.platforms || ["android", "ios"];
}

/**
 * Get the platform settings for Android, if available.
 */
export function getAndroidPlatform(manifest: Manifest) {
	return manifest.android || { versionCode: 0 };
}

/**
 * Get the platform settings for iOS, if available.
 */
export function getIosPlatform(manifest: Manifest) {
	return manifest.ios || { buildNumber: "" };
}
