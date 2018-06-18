const readManifests = jest.fn();

jest.doMock('../../src/expo', () => ({ readManifests, MANIFEST_FILE: 'app.json' }));

import verifyConditions from '../../src/scripts/verify-conditions';

const SemanticReleaseError = require('@semantic-release/error');

describe('scripts/verify-conditions', () => {
	it('reads manifest and logs name', async () => {
		const config = {
			manifests: [
				'app.json',
				'app.staging.json',
			],
		};
		const context = {
			logger: {
				log: jest.fn(),
				error: jest.fn(),
			},
		};

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
		const context = {
			logger: {
				log: jest.fn(),
				error: jest.fn(),
			},
		};

		readManifests.mockRejectedValue(new Error());

		expect(verifyConditions(config, context)).rejects.toThrowError();
	});
});
