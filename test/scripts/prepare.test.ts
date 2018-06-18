const readManifests = jest.fn();
const writeManifest = jest.fn();
const bumpVersions = jest.fn();

jest.doMock('../../src/expo', () => ({ readManifests, writeManifest, MANIFEST_FILE: 'app.json' }));
jest.doMock('../../src/version-bumpers', () => ({ default: bumpVersions }));

import prepare from '../../src/scripts/prepare';

describe('scripts/prepare', () => {
	it('reads and writes manifests with new version bumped', async () => {
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

		const oldMeta = { filename: 'app.json', content: JSON.stringify(oldManifest), manifest: oldManifest };

		readManifests.mockResolvedValue([oldMeta]);
		bumpVersions.mockReturnValue(newManifest);
		writeManifest.mockResolvedValue(undefined);

		await prepare(config, context);

		expect(readManifests).toBeCalled();
		expect(bumpVersions).toBeCalledWith(oldMeta, context);
		expect(writeManifest).toBeCalledWith(oldMeta, newManifest);

		expect(context.logger.log).toBeCalledWith(
			'New %s manifest written for %s to %s',
			'Expo',
			'test',
			'app.json',
		);
	});
});
