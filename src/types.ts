import { Manifest } from './expo';

/**
 * The semantic release configuration itself.
 */
export interface GlobalConfig {
	/** The branch on which releases should happen. */
	branch: string;
	/** The Git repository URL, in any supported format. */
	repositoryUrl: string;
	/** The Git tag format used by semantic-release to identify releases. */
	tagFormat: string;
}

export interface Config {
	//
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
		log: (message: string, ...vars: any[]) => void,
		error: (message: string, ...vars: any[]) => void,
	};
}

/**
 * A method which is used by semantic releases as script execution.
 * This is loaded and injected by semantic itself.
 */
export type SemanticMethod = (config: any, context: Context) => any;

/**
 * A method that updates a single manifest version number.
 * This can either be in general or platform specific like android and ios.
 */
export type VersionBumper = (manifest: Manifest, context: Context) => Manifest;
