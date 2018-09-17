const getAndroidPlatform = jest.fn();
const calculateAndroidVersion = jest.fn();

jest.doMock('../../src/expo', () => ({ getAndroidPlatform }));
jest.doMock('../../src/version', () => ({ calculateAndroidVersion }));

import bumpPlatformAndroid from '../../src/version-bumpers/platform-android';
import { createConfig, createContext, createManifestMeta } from '../factory';

describe('version-bumpers/platform-android', () => {
	it('returns new manifest with bumped android version', () => {
		const config = createConfig();
		const context = createContext({
			last: {
				gitHead: '12asd1',
				gitTag: 'v1.2.0',
				version: '1.2.0',
			},
			next: {
				gitHead: 'asd123',
				gitTag: 'v1.3.0',
				notes: 'New version',
				version: '1.3.0',
			},
		});

		const meta = createManifestMeta({
			android: { versionCode: 290010200 },
			ios: { buildNumber: '1.2.0' },
			name: 'test',
			sdkVersion: '29.0.0',
			version: '1.2.0',
		});

		getAndroidPlatform.mockReturnValue(meta.manifest.android);
		calculateAndroidVersion.mockReturnValue('290010300');

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
			android: { versionCode: 290010300 },
			ios: { buildNumber: '1.2.0' },
			name: 'test',
			sdkVersion: '29.0.0',
			version: '1.2.0',
		});
	});
});
