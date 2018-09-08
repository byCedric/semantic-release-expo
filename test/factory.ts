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
 * Create a (full) context object with logger, options and last/next releases.
 */
export function createContext(options: { next?: NextRelease, last?: LastRelease } = {}): Context {
	return {
		...createContextLogger(),
		...createContextOptions(),
		...createContextNextRelease(options.next),
		...createContextLastRelease(options.last),
	};
}

/**
 * Create a context partial with a mocked logger.
 */
export function createContextLogger() {
	return {
		logger: {
			log: jest.fn(),
			error: jest.fn(),
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
			version: options ? options.version : '1.2.0',
			gitTag: options ? options.version : 'v1.2.0',
			gitHead: options ? options.gitHead : 'abc234',
			notes: options ? options.notes : 'Testing notes',
		},
	};
}

/**
 * Create a context partial which defines the last release.
 */
export function createContextLastRelease(options?: LastRelease) {
	return {
		lastRelease: {
			version: options ? options.version : '1.1.3',
			gitTag: options ? options.version : 'v1.1.3',
			gitHead: options ? options.gitHead : 'abc123',
		},
	};
}

/**
 * Create a manifest meta object containing the manifest data.
 */
export function createManifestMeta(manifest: Manifest): ManifestMeta {
	return {
		filename: 'app.json',
		content: JSON.stringify(manifest),
		manifest,
	};
}
