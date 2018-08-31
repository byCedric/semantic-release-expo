const getAndroidPlatform = jest.fn();

jest.doMock('../../src/expo', () => ({ getAndroidPlatform }));

import bumpPlatformAndroid from '../../src/version-bumpers/platform-android';

describe('version-bumpers/platform-android', () => {
	it('returns new manifest with bumped android version', () => {
		const context = {
			logger: {
				log: jest.fn(),
				error: jest.fn(),
			},
			nextRelease: {
				version: '1.3.0',
				gitTag: 'v1.3.0',
				gitHead: 'abc12',
				notes: 'Testing a new version',
			},
		};

		const oldManifest = {
			name: 'test',
			version: '1.2.0',
			sdkVersion: '29.0.0',
			android: { versionCode: 290010200 },
			ios: { buildNumber: '1.2.0' },
		};

		const meta = {
			filename: 'app.json',
			content: JSON.stringify(oldManifest),
			manifest: oldManifest,
		};

		getAndroidPlatform.mockReturnValue(oldManifest.android);

		const newManifest = bumpPlatformAndroid(meta, context);

		expect(getAndroidPlatform).toBeCalledWith(oldManifest);
		expect(context.logger.log).toBeCalledWith(
			'%s manifest android version changed (%s => %s) in %s',
			'Expo',
			290010200,
			290010300,
			'app.json',
		);

		expect(newManifest).toMatchObject({
			name: 'test',
			version: '1.2.0',
			sdkVersion: '29.0.0',
			android: { versionCode: 290010300 },
			ios: { buildNumber: '1.2.0' },
		});
	});
});
