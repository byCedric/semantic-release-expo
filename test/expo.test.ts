const readFile = jest.fn();
const readJson = jest.fn();
const writeJson = jest.fn();
const detectIndent = jest.fn();
const detectNewline = jest.fn();

jest.doMock('fs-extra', () => ({ readFile, readJson, writeJson }));
jest.doMock('detect-indent', () => detectIndent);
jest.doMock('detect-newline', () => detectNewline);

import {
	MANIFEST_FILE,
	DEFAULT_INDENT,
	DEFAULT_NEWLINE,
	readManifest,
	writeManifest,
	getPlatforms,
	getAndroidPlatform,
	getIosPlatform,
} from '../src/expo';

describe('expo', () => {
	describe('constants', () => {
		it('has correct manifest file name', () => expect(MANIFEST_FILE).toBe('app.json'));
		it('has double spaces as default indent', () => expect(DEFAULT_INDENT).toBe('  '));
		it('has line feed as default new line', () => expect(DEFAULT_NEWLINE).toBe('\n'));
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
			detectNewline.mockReturnValue('\n');

			await writeManifest(manifestData);

			expect(detectIndent).toBeCalledWith(manifestString);
			expect(detectNewline).toBeCalledWith(manifestString);
			expect(writeJson).toBeCalledWith(MANIFEST_FILE, { expo: manifestData }, { spaces: '\t', EOL: '\n' });
		});

		it('writes manifest file with fallback indentation', async () => {
			const manifestData = { name: 'test' };
			const manifestString = `{
				"expo": {
					"name": "old"
				}
			}`;

			const options = {
				spaces: DEFAULT_INDENT,
				EOL: DEFAULT_NEWLINE,
			};

			readFile.mockReturnValue(manifestString);
			detectIndent.mockReturnValue(undefined);
			detectNewline.mockReturnValue(undefined);

			await writeManifest(manifestData);

			expect(detectIndent).toBeCalledWith(manifestString);
			expect(detectNewline).toBeCalledWith(manifestString);
			expect(writeJson).toBeCalledWith(MANIFEST_FILE, { expo: manifestData }, options);
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
