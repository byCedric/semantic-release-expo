import { Config } from './types';
import { MANIFEST_FILE } from './expo';

/**
 * Get the manifest files that needs to be updated from the configuration.
 * If this wasn't set, or is empty, the default manifest file will be returned.
 */
export function getManifestFiles(config: Config): string[] {
	if (!config.manifests || config.manifests.length <= 0) {
		return [MANIFEST_FILE];
	}

	return config.manifests;
}
