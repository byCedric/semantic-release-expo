const getPlatforms = jest.fn();
const bumpPlatformAndroid = jest.fn();
const bumpPlatformIos = jest.fn();
const bumpVersion = jest.fn();

jest.doMock('../../src/expo', () => ({ getPlatforms }));
jest.doMock('../../src/version-bumpers/platform-android', () => bumpPlatformAndroid);
jest.doMock('../../src/version-bumpers/platform-ios', () => bumpPlatformIos);
jest.doMock('../../src/version-bumpers/version', () => bumpVersion);

import bumpAllVersion from '../../src/version-bumpers';
import { createConfig, createContext, createManifestMeta } from '../factory';

describe('version-bumpers', () => {
	it('returns new manifest with bumped version', () => {
		const config = createConfig();
		const context = createContext({
			next: {
				gitHead: 'abc12',
				gitTag: 'v9.1.0',
				notes: 'Testing a new version',
				version: '9.1.0',
			},
		});

		const oldMeta = createManifestMeta({ name: 'test', version: '9.0.0' });
		const newMeta = createManifestMeta({ name: 'test', version: '9.1.9' });

		getPlatforms.mockReturnValue([]);
		bumpVersion.mockReturnValue(newMeta.manifest);

		const received = bumpAllVersion(oldMeta, config, context);

		expect(received).toBe(newMeta.manifest);
		expect(bumpVersion).toBeCalledWith(oldMeta, config, context);
	});

	it('returns new manifest with bumped version and platform versions', () => {
		const config = createConfig();
		const context = createContext({
			next: {
				gitHead: 'abc12',
				gitTag: 'v2.4.0',
				notes: 'Testing a new version',
				version: '2.4.0',
			},
		});

		const oldMeta = createManifestMeta({
			android: { versionCode: 12 },
			ios: { buildNumber: '2.3.0' },
			name: 'test',
			version: '2.3.0',
		});

		// reuse the old manifest meta, stringified contents should match the exact file content (not updated one).
		const createPatchedManifestMeta = (meta: any, manifest: any) => ({
			...meta,
			manifest: {
				...meta.manifest,
				...manifest,
			},
		});

		const newVersionMeta = createPatchedManifestMeta(oldMeta, { version: '2.4.0' });
		const newAndroidMeta = createPatchedManifestMeta(newVersionMeta, { android: { versionCode: 13 } });
		const newIosMeta = createPatchedManifestMeta(newAndroidMeta, { ios: { buildNumber: '2.4.0' } });

		getPlatforms.mockReturnValue(['android', 'ios']);
		bumpVersion.mockReturnValue(newVersionMeta.manifest);
		bumpPlatformAndroid.mockReturnValue(newAndroidMeta.manifest);
		bumpPlatformIos.mockReturnValue(newIosMeta.manifest);

		const received = bumpAllVersion(oldMeta, config, context);

		expect(received).toBe(newIosMeta.manifest);
		expect(bumpVersion).toBeCalledWith(oldMeta, config, context);
		expect(bumpPlatformAndroid).toBeCalledWith(newVersionMeta, config, context);
		expect(bumpPlatformIos).toBeCalledWith(newAndroidMeta, config, context);
	});
});
