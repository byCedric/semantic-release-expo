const getPlatforms = jest.fn();
const bumpPlatformAndroid = jest.fn();
const bumpPlatformIos = jest.fn();
const bumpVerison = jest.fn();

jest.doMock('../../src/expo', () => ({ getPlatforms }));
jest.doMock('../../src/version-bumpers/platform-android', () => ({ default: bumpPlatformAndroid }));
jest.doMock('../../src/version-bumpers/platform-ios', () => ({ default: bumpPlatformIos }));
jest.doMock('../../src/version-bumpers/version', () => ({ default: bumpVerison }));

import bumpAllVersion from '../../src/version-bumpers';

describe('version-bumpers', () => {
	it('returns new manifest with bumped version', () => {
		const context = {
			logger: {
				log: jest.fn(),
				error: jest.fn(),
			},
			nextRelease: {
				version: '9.1.0',
				gitTag: 'v9.1.0',
				gitHead: 'abc12',
				notes: 'Testing a new version',
			},
		};

		const oldManifest = { name: 'test', version: '9.0.0' };
		const newManifest = { name: 'test', version: '9.1.0' };

		getPlatforms.mockReturnValue([]);
		bumpVerison.mockReturnValue(newManifest);

		const received = bumpAllVersion(oldManifest, context);

		expect(received).toBe(newManifest);
		expect(bumpVerison).toBeCalledWith(oldManifest, context);
	});

	it('returns new manifest with bumped version and platform versions', () => {
		const context = {
			logger: {
				log: jest.fn(),
				error: jest.fn(),
			},
			nextRelease: {
				version: '2.4.0',
				gitTag: 'v2.4.0',
				gitHead: 'abc12',
				notes: 'Testing a new version',
			},
		};

		const oldManifest = {
			name: 'test',
			version: '2.3.0',
			android: { versionCode: 12 },
			ios: { buildNumber: '2.3.0' },
		};

		const newVersionManifest = { ...oldManifest, version: '2.4.0' };
		const newAndroidManifest = { ...newVersionManifest, android: { versionCode: 13 } };
		const newIosManifest = { ...newAndroidManifest, ios: { buildNumber: '2.4.0' } };

		getPlatforms.mockReturnValue(['android', 'ios']);
		bumpVerison.mockReturnValue(newVersionManifest);
		bumpPlatformAndroid.mockReturnValue(newAndroidManifest);
		bumpPlatformIos.mockReturnValue(newIosManifest);

		const received = bumpAllVersion(oldManifest, context);

		expect(received).toBe(newIosManifest);
		expect(bumpVerison).toBeCalledWith(oldManifest, context);
		expect(bumpPlatformAndroid).toBeCalledWith(newVersionManifest, context);
		expect(bumpPlatformIos).toBeCalledWith(newAndroidManifest, context);
	});
});
