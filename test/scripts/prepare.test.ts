const readManifest = jest.fn();
const writeManifest = jest.fn();
const bumpVersions = jest.fn();

jest.doMock('../../src/expo', () => ({ readManifest, writeManifest }));
jest.doMock('../../src/version-bumpers', () => ({ default: bumpVersions }));

import prepare from '../../src/scripts/prepare';

describe('scripts/prepare', () => {
	it('reads and writes manifest with new version bumped', async () => {
		const config = {};
		const context = {
			nextRelease: {
				version: '0.2.1',
				gitTag: 'v0.2.1',
				gitHead: 'abc12',
				notes: 'Testing a new version',
			},
			logger: {
				log: jest.fn(),
				error: jest.fn(),
			},
		};

		const oldManifest = { name: 'test', version: '0.2.0' };
		const newManifest = { name: 'test', version: '0.2.1' };

		readManifest.mockReturnValue(oldManifest);
		bumpVersions.mockReturnValue(newManifest);

		await prepare(config, context);

		expect(readManifest).toBeCalled();
		expect(bumpVersions).toBeCalledWith(oldManifest, context);
		expect(writeManifest).toBeCalledWith(newManifest);

		expect(context.logger.log).toBeCalledWith('New %s manifest written', 'Expo');
	});
});
