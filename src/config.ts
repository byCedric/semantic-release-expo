import { Config, Context } from './types';
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

/**
 * Get the full prepare configuration of the prepare step for this extension.
 * It's mostly used for the verify conditions step to inherit the configuration.
 */
export function getPrepareConfig(context: Context): Config | undefined {
	if (context.options && context.options.prepare) {
		const plugins = Array.isArray(context.options.prepare)
			? context.options.prepare
			: [context.options.prepare];

		return plugins.find(config => config.path && config.path === 'semantic-release-expo');
	}
}

/**
 * Inherit all configuration from the possible prepare step.
 * This makes sure we don't have to copy all settings when verifying.
 */
export function inheritPrepareConfig(config: Config, context: Context): Config {
	const prepareConfig = getPrepareConfig(context) || {};

	return {
		manifests: config.manifests || prepareConfig.manifests
	};
}
