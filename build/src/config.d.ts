import { Config, Context, VersionTemplates } from './types';
/**
 * Get the manifest files that needs to be updated from the configuration.
 * If this wasn't set, or is empty, the default manifest file will be returned.
 */
export declare function getManifestFiles(config: Config): string[];
/**
 * Get the template functions that builds the platform specific build numbers.
 */
export declare function getVersionTemplates(config?: Config): VersionTemplates;
/**
 * Get the full prepare configuration of the prepare step for this extension.
 * It's mostly used for the verify conditions step to inherit the configuration.
 */
export declare function getPrepareConfig(context: Context): Config | undefined;
/**
 * Inherit all configuration from the possible prepare step.
 * This makes sure we don't have to copy all settings when verifying.
 */
export declare function inheritPrepareConfig(config: Config, context: Context): Config;
