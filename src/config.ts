import { MANIFEST_FILE } from './expo';
import { Config, Context, VersionTemplates } from './types';

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
 * Get the template functions that builds the platform specific build numbers.
 */
export function getVersionTemplates(config?: Config): VersionTemplates {
	const template = config && config.versions;
	const fallback = typeof template === 'string' ? template : '${recommended}';

	return {
		android: (typeof template === 'object' && template.android) ? template.android : fallback,
		ios: (typeof template === 'object' && template.ios) ? template.ios : fallback,
		version: (typeof template === 'object' && template.version) ? template.version : fallback,
	};
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

		return plugins.find((config) => config.path && config.path === 'semantic-release-expo');
	}
}

/**
 * Inherit all configuration from the possible prepare step.
 * This makes sure we don't have to copy all settings when verifying.
 */
export function inheritPrepareConfig(config: Config, context: Context): Config {
	const prepareConfig = getPrepareConfig(context) || {};

	return {
		manifests: config.manifests || prepareConfig.manifests,
	};
}
