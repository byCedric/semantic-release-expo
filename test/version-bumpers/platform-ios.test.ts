const getIosPlatform = jest.fn();

jest.doMock('../../src/expo', () => ({ getIosPlatform }));

import bumpPlatformIos from '../../src/version-bumpers/platform-ios';

describe('version-bumpers/platform-ios', () => {
	it('returns new manifest with bumped ios version', () => {
		const context = {
			logger: {
				log: jest.fn(),
				error: jest.fn(),
			},
			nextRelease: {
				version: '0.2.1',
				gitTag: 'v0.2.1',
				gitHead: 'abc12',
				notes: 'Testing a new version',
			},
		};

		const oldManifest = {
			name: 'test',
			version: '0.2.0',
			android: { versionCode: 6 },
			ios: { buildNumber: '0.2.0' },
		};

		getIosPlatform.mockReturnValue(oldManifest.ios);

		const newManifest = bumpPlatformIos(oldManifest, context);

		expect(getIosPlatform).toBeCalledWith(oldManifest);
		expect(context.logger.log).toBeCalledWith(
			'%s manifest ios version changed (%s => %s)',
			'Expo',
			'0.2.0',
			'0.2.1',
		);

		expect(newManifest).toMatchObject({
			name: 'test',
			version: '0.2.0',
			android: { versionCode: 6 },
			ios: { buildNumber: '0.2.1' },
		});
	});
});
