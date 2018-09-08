const getAndroidPlatform = jest.fn();
const calculateAndroidVersion = jest.fn();

jest.doMock('../../src/expo', () => ({ getAndroidPlatform }));
jest.doMock('../../src/version', () => ({ calculateAndroidVersion }));

import bumpPlatformAndroid from '../../src/version-bumpers/platform-android';
import { createContext, createConfig, createManifestMeta } from '../factory';

describe('version-bumpers/platform-android', () => {
	it('returns new manifest with bumped android version', () => {
		const config = createConfig();
		const context = createContext({
			last: {
				version: '1.2.0',
				gitTag: 'v1.2.0',
				gitHead: '12asd1',
			},
			next: {
				version: '1.3.0',
				gitTag: 'v1.3.0',
				gitHead: 'asd123',
				notes: 'New version',
			},
		});

		const meta = createManifestMeta({
			name: 'test',
			version: '1.2.0',
			sdkVersion: '29.0.0',
			android: { versionCode: 290010200 },
			ios: { buildNumber: '1.2.0' },
		});

		getAndroidPlatform.mockReturnValue(meta.manifest.android);
		calculateAndroidVersion.mockReturnValue(290010300);

		const manifest = bumpPlatformAndroid(meta, config, context);

		expect(getAndroidPlatform).toBeCalledWith(meta.manifest);
		expect(calculateAndroidVersion).toBeCalledWith(meta, config, context);
		expect(context.logger.log).toBeCalledWith(
			'%s manifest android version changed (%s => %s) in %s',
			'Expo',
			meta.manifest.android!.versionCode,
			290010300,
			meta.filename,
		);

		expect(manifest).toMatchObject({
			name: 'test',
			version: '1.2.0',
			sdkVersion: '29.0.0',
			android: { versionCode: 290010300 },
			ios: { buildNumber: '1.2.0' },
		});
	});
});
