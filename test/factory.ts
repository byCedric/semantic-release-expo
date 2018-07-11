import { Context } from '../src/types';

/**
 * Create a simple context logger with mock methods.
 */
export function createContextLogger() {
	return {
		log: jest.fn(),
		error: jest.fn(),
	};
}

/**
 * Create a simple context object with logger.
 */
export function createContext(): Context {
	return { logger: createContextLogger() };
}

/**
 * Create a context with logger and default options.
 */
export function createContextWithOptions(): Context {
	return {
		logger: createContextLogger(),
		options: {
			branch: 'master',
			repositoryUrl: 'https://github.com/bycedric/semantic-release-expo',
			tagFormat: '${version}',
		},
	};
}
