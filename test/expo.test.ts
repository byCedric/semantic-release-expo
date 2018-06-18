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
	readManifests,
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
			readFile.mockResolvedValue('{ "expo": { "name": "test" } }');

			const meta = await readManifest(MANIFEST_FILE);

			expect(readFile).toBeCalledWith(MANIFEST_FILE, 'utf8');
			expect(meta.manifest).toMatchObject({ name: 'test' });
		});
	});

	describe('#readManifests', () => {
		it('reads multiple manifest files', async () => {
			readFile
				.mockResolvedValueOnce('{ "expo": { "name": "first" } }')
				.mockResolvedValueOnce('{ "expo": { "name": "second" } }');

			const metas = await readManifests([MANIFEST_FILE, MANIFEST_FILE]);

			expect(readFile).toHaveBeenNthCalledWith(1, MANIFEST_FILE, 'utf8');
			expect(readFile).toHaveBeenNthCalledWith(2, MANIFEST_FILE, 'utf8');

			expect(metas[0].manifest).toMatchObject({ name: 'first' });
			expect(metas[1].manifest).toMatchObject({ name: 'second' });
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

			const manifestMeta = {
				filename: MANIFEST_FILE,
				content: manifestString,
				manifest: JSON.parse(manifestString).expo,
			};

			detectIndent.mockReturnValue({ indent: '\t' });
			detectNewline.mockReturnValue('\n');

			await writeManifest(manifestMeta, manifestData);

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

			const manifestMeta = {
				filename: MANIFEST_FILE,
				content: manifestString,
				manifest: JSON.parse(manifestString).expo,
			};

			const options = {
				spaces: DEFAULT_INDENT,
				EOL: DEFAULT_NEWLINE,
			};

			detectIndent.mockReturnValue(undefined);
			detectNewline.mockReturnValue(undefined);

			await writeManifest(manifestMeta, manifestData);

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
