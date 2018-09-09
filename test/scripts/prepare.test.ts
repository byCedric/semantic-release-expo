const readManifests = jest.fn();
const writeManifest = jest.fn();
const bumpVersions = jest.fn();

jest.doMock('../../src/expo', () => ({ readManifests, writeManifest, MANIFEST_FILE: 'app.json' }));
jest.doMock('../../src/version-bumpers', () => bumpVersions);

import prepare from '../../src/scripts/prepare';
import { createConfig, createContext, createManifestMeta } from '../factory';

describe('scripts/prepare', () => {
	it('reads and writes manifests with new version bumped', async () => {
		const config = createConfig();
		const context = createContext({
			last: {
				gitHead: 'abc123',
				gitTag: 'v0.2.0',
				version: '0.2.0',
			},
			next: {
				gitHead: 'abc234',
				gitTag: 'v0.2.1',
				notes: 'Testing a new version',
				version: '0.2.1',
			},
		});

		const oldMeta = createManifestMeta({ name: 'test', version: '0.2.0' });
		const newMeta = createManifestMeta({ name: 'test', version: '0.2.1' });

		readManifests.mockResolvedValue([oldMeta]);
		bumpVersions.mockReturnValue(newMeta.manifest);
		writeManifest.mockResolvedValue(undefined);

		await prepare(config, context);

		expect(readManifests).toBeCalled();
		expect(bumpVersions).toBeCalledWith(oldMeta, config, context);
		expect(writeManifest).toBeCalledWith(oldMeta, newMeta.manifest);

		expect(context.logger.log).toBeCalledWith(
			'New %s manifest written for %s to %s',
			'Expo',
			'test',
			'app.json',
		);
	});
});
