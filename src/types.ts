import { Manifest, ManifestMeta } from './expo';

/**
 * The semantic release configuration itself.
 */
export interface GlobalConfig {
	/** The full prepare step configuration. */
	prepare?: any;
	/** The branch on which releases should happen. */
	branch: string;
	/** The Git repository URL, in any supported format. */
	repositoryUrl: string;
	/** The Git tag format used by semantic-release to identify releases. */
	tagFormat: string;
}

export interface Config {
	/** The manifest file(s) to update. */
	manifests?: string[];
	/** The (lodash) version template formats for all version outputs. */
	versions?: string | {
		/** The manifest version template to use. */
		version?: string;
		/** The android-specific version (code) template to use. */
		android?: string;
		/** The ios-specific build number template to use. */
		ios?: string;
	};
}

export interface LastRelease {
	/** The version name of the release */
	version: string;
	/** The Git tag of the release. */
	gitTag: string;
	/** The Git checksum of the last commit of the release. */
	gitHead: string;
}

export interface NextRelease extends LastRelease {
	/** The release notes of the next release. */
	notes: string;
}

export interface Context {
	/** The semantic release configuration itself. */
	options?: GlobalConfig;
	/** The previous release details. */
	lastRelease?: LastRelease;
	/** The next release details. */
	nextRelease?: NextRelease;
	/** The shared logger instance of semantic release. */
	logger: {
		log: (message: string, ...vars: any[]) => void;
		error: (message: string, ...vars: any[]) => void;
	};
}

/**
 * A method which is used by semantic releases as script execution.
 * This is loaded and injected by semantic itself.
 */
export type SemanticMethod = (config: Config, context: Context) => any;

/**
 * A method that updates a single manifest version number.
 * This can either be in general or platform specific like android and ios.
 */
export type VersionBumper = (meta: ManifestMeta, config: Config, context: Context) => Manifest;

/**
 * A method that can calculate a new version (tag) based on a template.
 * It also receives all information related to current version, configuration and context.
 */
export type VersionCalculator = (meta: ManifestMeta, config: Config, context: Context) => string;

export interface VersionTemplates {
	/** The manifest version template to use. */
	version: string;
	/** The android-specific version (code) template to use. */
	android: string;
	/** The ios-specific build number template to use. */
	ios: string;
}
