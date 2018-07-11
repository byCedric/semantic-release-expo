const readManifests = jest.fn();

jest.doMock('../../src/expo', () => ({ readManifests, MANIFEST_FILE: 'app.json' }));

import verifyConditions from '../../src/scripts/verify-conditions';

const SemanticReleaseError = require('@semantic-release/error');

describe('scripts/verify-conditions', () => {
	const createContextWithPrepare = (prepare?: any) => ({
		options: {
			prepare,
			branch: 'master',
			repositoryUrl: 'https://github.com/bycedric/semantic-release-expo',
			tagFormat: '${version}',
		},
		logger: {
			log: jest.fn(),
			error: jest.fn(),
		},
	});

	it('reads manifest and logs name', async () => {
		const config = {
			manifests: [
				'app.json',
				'app.staging.json',
			],
		};
		const context = createContextWithPrepare();

		const firstMeta = {
			filename: 'app.json',
			content: '{ "name": "test" }',
			manifest: { name: 'test' },
		};

		const secondMeta = {
			filename: 'app.staging.json',
			content: '{ "name": "test-staging" }',
			manifest: { name: 'test-staging' },
		};

		readManifests.mockResolvedValue([firstMeta, secondMeta]);

		await verifyConditions(config, context);

		expect(readManifests).toBeCalled();
		expect(context.logger.log).toHaveBeenNthCalledWith(
			1,
			'Found %s manifest for %s in %s',
			'Expo',
			'test',
			'app.json',
		);

		expect(context.logger.log).toHaveBeenNthCalledWith(
			2,
			'Found %s manifest for %s in %s',
			'Expo',
			'test-staging',
			'app.staging.json',
		);
	});

	it('throws when read manifest failed', async () => {
		const config = {};
		const context = createContextWithPrepare();

		readManifests.mockRejectedValue(new Error());

		expect(verifyConditions(config, context)).rejects.toThrowError();
	});

	it('inherits prepare configration without verify conditions configuration', async () => {
		const config = {};
		const manifests = ['app.production.json', 'app.staging.json'];
		const context = createContextWithPrepare([
			{ path: '@semantic-release/changelog' },
			{ path: '@semantic-release/npm' },
			{ path: 'semantic-release-expo', manifests },
		]);

		const firstMeta = {
			filename: 'app.production.json',
			content: '{ "name": "test" }',
			manifest: { name: 'test' },
		};

		const secondMeta = {
			filename: 'app.staging.json',
			content: '{ "name": "test-staging" }',
			manifest: { name: 'test-staging' },
		};

		readManifests.mockResolvedValue([firstMeta, secondMeta]);

		await verifyConditions(config, context);

		expect(readManifests).toBeCalled();
		expect(context.logger.log).toHaveBeenNthCalledWith(
			1,
			'Found %s manifest for %s in %s',
			'Expo',
			'test',
			'app.production.json',
		);

		expect(context.logger.log).toHaveBeenNthCalledWith(
			2,
			'Found %s manifest for %s in %s',
			'Expo',
			'test-staging',
			'app.staging.json',
		);
	});
});
