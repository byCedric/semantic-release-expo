const readFile = jest.fn();
const readJson = jest.fn();
const writeJson = jest.fn();
const detectIndent = jest.fn();

jest.doMock('fs-extra', () => ({ readFile, readJson, writeJson }));
jest.doMock('detect-indent', () => detectIndent);

import {
	MANIFEST_FILE,
	readManifest,
	writeManifest,
	getPlatforms,
	getAndroidPlatform,
	getIosPlatform,
} from '../src/expo';

describe('expo', () => {
	describe('+MANIFEST_FILE', () => {
		it('has correct manifest file name', () => expect(MANIFEST_FILE).toBe('app.json'));
	});

	describe('#readManifest', () => {
		it('reads the manifest file', async () => {
			readJson.mockReturnValue({ expo: { name: 'test' } });

			const manifest = await readManifest()

			expect(readJson).toBeCalledWith(MANIFEST_FILE);
			expect(manifest).toMatchObject({ name: 'test' });
		});
	});

	describe('#writeManifest', () => {
		it('writes the manifest file with indentation detection', async () => {
			const manifestData = { name: 'test' };
			const manifestString = `{
				"expo": {
					"name": "old"
				}
			}`;

			readFile.mockReturnValue(manifestString);
			detectIndent.mockReturnValue({ indent: '\t' });

			await writeManifest(manifestData);

			expect(detectIndent).toBeCalledWith(manifestString);
			expect(writeJson).toBeCalledWith(MANIFEST_FILE, { expo: manifestData }, { spaces: '\t' });
		});
	});

	describe('#getPlatforms', () => {
		it('returns default platforms', () => {
			const platforms = getPlatforms({ name: 'test' });

			expect(platforms).toContain('android');
			expect(platforms).toContain('ios');
		});

		it('returns defined platforms from manifest', () => {
			const platforms = ['android'];

			expect(getPlatforms({ name: 'test', platforms })).toBe(platforms);
		});
	});

	describe('#getAndroidPlatform', () => {
		it('returns default android settings', () => {
			expect(getAndroidPlatform({ name: 'test' })).toMatchObject({ versionCode: 0 });
		});

		it('returns defined android settings from manifest', () => {
			const android = { versionCode: 1337 };

			expect(getAndroidPlatform({ name: 'test', android })).toMatchObject(android);
		});
	});

	describe('#getIosPlatform', () => {
		it('returns default ios settings', () => {
			expect(getIosPlatform({ name: 'test' })).toMatchObject({ buildNumber: '' });
		});

		it('returns defined ios settings from manifest', () => {
			const ios = { buildNumber: '1.3.7' };

			expect(getIosPlatform({ name: 'test', ios })).toMatchObject(ios);
		});
	});
})
