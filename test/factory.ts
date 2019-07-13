import { Manifest, ManifestMeta } from '../src/expo';
import { Config, Context, LastRelease, NextRelease } from '../src/types';

/**
 * Create an empty object representing the config.
 * This is mostly for future configuration and not-having-to-rewrite the tests.
 */
export function createConfig(): Config {
	return {};
}

/**
 * Create a context partial with a mocked logger.
 */
export function createContextLogger() {
	return {
		logger: {
			error: jest.fn(),
			log: jest.fn(),
		},
	};
}

/**
 * Create a context partial with some general repository options.
 */
export function createContextOptions() {
	return {
		options: {
			branch: 'master',
			repositoryUrl: 'https://github.com/bycedric/semantic-release-expo',
			tagFormat: '${version}',
		},
	};
}

/**
 * Create a context partial which defines the next release.
 */
export function createContextNextRelease(options?: NextRelease) {
	return {
		nextRelease: {
			gitHead: options ? options.gitHead : 'abc234',
			gitTag: options ? options.version : 'v1.2.0',
			notes: options ? options.notes : 'Testing notes',
			version: options ? options.version : '1.2.0',
		},
	};
}

/**
 * Create a context partial which defines the last release.
 */
export function createContextLastRelease(options?: LastRelease) {
	return {
		lastRelease: {
			gitHead: options ? options.gitHead : 'abc123',
			gitTag: options ? options.version : 'v1.1.3',
			version: options ? options.version : '1.1.3',
		},
	};
}

/**
 * Create a manifest meta object containing the manifest data.
 */
export function createManifestMeta(manifest: Manifest): ManifestMeta {
	return {
		content: JSON.stringify(manifest),
		filename: 'app.json',
		manifest,
	};
}

/**
 * Create a (full) context object with logger, options and last/next releases.
 */
export function createContext(options: { next?: NextRelease; last?: LastRelease } = {}): Context {
	return {
		...createContextLogger(),
		...createContextOptions(),
		...createContextNextRelease(options.next),
		...createContextLastRelease(options.last),
	};
}
