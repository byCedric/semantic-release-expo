const readManifest = jest.fn();
const writeManifest = jest.fn();
const bumpVersions = jest.fn();

jest.doMock('../../src/expo', () => ({ readManifest }));

import verifyConditions from '../../src/scripts/verify-conditions';

const SemanticReleaseError = require('@semantic-release/error');

describe('scripts/verify-conditions', () => {
	it('reads manifest and logs name', async () => {
		const config = {};
		const context = {
			logger: {
				log: jest.fn(),
				error: jest.fn(),
			},
		};

		readManifest.mockReturnValue({ name: 'test' });

		await verifyConditions(config, context);

		expect(readManifest).toBeCalled();
		expect(context.logger.log).toBeCalledWith('Found %s manifest for %s', 'Expo', 'test');
	});

	it('throws when read manifest failed', async () => {
		const config = {};
		const context = {
			logger: {
				log: jest.fn(),
				error: jest.fn(),
			},
		};

		readManifest.mockReturnValue(Promise.reject(new Error()));

		expect(verifyConditions(config, context)).rejects.toThrowError();
	});
});
