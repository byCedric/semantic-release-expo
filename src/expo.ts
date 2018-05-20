import { readFile, readJson, writeJson } from 'fs-extra';
import * as detectIndent from 'detect-indent';

/**
 * A manifest-light definition to use for typehinting.
 *
 * @todo Replace with `@types/expo` when react-native and node console issue is resolved
 */
export interface Manifest {
	name: string;
	platforms?: string[];
	android?: { versionCode: number };
	ios?: { buildNumber: string };
	[propName: string]: any;
}

/**
 * The name of the Expo manifest file.
 */
export const MANIFEST_FILE = 'app.json';

/**
 * Read the Expo manifest content and return the parsed JSON.
 */
export async function readManifest(): Promise<Manifest> {
	return (await readJson(MANIFEST_FILE)).expo;
}

/**
 * Write new content to the Expo manifest file, keeping indentation intact.
 */
export async function writeManifest(newContent: Manifest) {
	const oldContent = await readFile(MANIFEST_FILE, 'utf8');
	const { indent } = detectIndent(oldContent);

	await writeJson(MANIFEST_FILE, { expo: newContent }, { spaces: indent });
}

/**
 * Get the platforms from a loaded manifest.
 * This will fallback to the default from Expo itself.
 */
export function getPlatforms(manifest: Manifest) {
	return manifest.platforms || ['android', 'ios'];
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
	return manifest.ios || { buildNumber: '' };
}
