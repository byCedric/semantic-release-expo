const getIosPlatform = jest.fn();
const calculateIosVersion = jest.fn();

jest.doMock('../../src/expo', () => ({ getIosPlatform }));
jest.doMock('../../src/version', () => ({ calculateIosVersion }));

import bumpPlatformIos from '../../src/version-bumpers/platform-ios';
import { createContext, createConfig, createManifestMeta } from '../factory';

describe('version-bumpers/platform-ios', () => {
	it('returns new manifest with bumped ios version', () => {
		const config = createConfig();
		const context = createContext();
		const meta = createManifestMeta({
			name: 'test',
			version: context.lastRelease!.version,
			android: { versionCode: 6 },
			ios: { buildNumber: context.lastRelease!.version },
		});

		getIosPlatform.mockReturnValue(meta.manifest.ios);
		calculateIosVersion.mockReturnValue('newversion');

		const manifest = bumpPlatformIos(meta, config, context);

		expect(getIosPlatform).toBeCalledWith(meta.manifest);
		expect(calculateIosVersion).toBeCalledWith(meta, config, context);
		expect(context.logger.log).toBeCalledWith(
			'%s manifest ios version changed (%s => %s) in %s',
			'Expo',
			meta.manifest.ios!.buildNumber,
			'newversion',
			meta.filename,
		);

		expect(manifest).toMatchObject({
			name: 'test',
			version: context.lastRelease!.version,
			android: { versionCode: 6 },
			ios: { buildNumber: 'newversion' },
		});
	});
});
