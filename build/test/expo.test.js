"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readFile = jest.fn();
const readJson = jest.fn();
const writeJson = jest.fn();
const detectIndent = jest.fn();
const detectNewline = jest.fn();
jest.doMock('fs-extra', () => ({ readFile, readJson, writeJson }));
jest.doMock('detect-indent', () => detectIndent);
jest.doMock('detect-newline', () => detectNewline);
const expo_1 = require("../src/expo");
const factory_1 = require("./factory");
describe('expo', () => {
    describe('constants', () => {
        it('has correct manifest file name', () => expect(expo_1.MANIFEST_FILE).toBe('app.json'));
        it('has double spaces as default indent', () => expect(expo_1.DEFAULT_INDENT).toBe('  '));
        it('has line feed as default new line', () => expect(expo_1.DEFAULT_NEWLINE).toBe('\n'));
    });
    describe('#logManifestFromError', () => {
        it('does not log anything for normal errors', () => {
            const context = factory_1.createContext();
            expo_1.logManifestFromError(context, new Error());
            expect(context.logger.log.mock.calls).toHaveLength(0);
        });
        it('does log for errors related to manifest errors', () => {
            const context = factory_1.createContext();
            const error = new Error();
            error.expo = 'app.production.json';
            expo_1.logManifestFromError(context, error);
            expect(context.logger.log).toBeCalledWith('Error encountered for %s manifest %s', 'Expo', 'app.production.json');
        });
    });
    describe('#readManifest', () => {
        it('reads the manifest file', () => __awaiter(void 0, void 0, void 0, function* () {
            readFile.mockResolvedValue('{ "expo": { "name": "test" } }');
            const meta = yield expo_1.readManifest(expo_1.MANIFEST_FILE);
            expect(readFile).toBeCalledWith(expo_1.MANIFEST_FILE, 'utf8');
            expect(meta.manifest).toMatchObject({ name: 'test' });
        }));
    });
    describe('#readManifests', () => {
        it('reads multiple manifest files', () => __awaiter(void 0, void 0, void 0, function* () {
            readFile
                .mockResolvedValueOnce('{ "expo": { "name": "first" } }')
                .mockResolvedValueOnce('{ "expo": { "name": "second" } }');
            const metas = yield expo_1.readManifests([expo_1.MANIFEST_FILE, expo_1.MANIFEST_FILE]);
            expect(readFile).toHaveBeenNthCalledWith(1, expo_1.MANIFEST_FILE, 'utf8');
            expect(readFile).toHaveBeenNthCalledWith(2, expo_1.MANIFEST_FILE, 'utf8');
            expect(metas[0].manifest).toMatchObject({ name: 'first' });
            expect(metas[1].manifest).toMatchObject({ name: 'second' });
        }));
    });
    describe('#writeManifest', () => {
        it('writes the manifest file with indentation detection', () => __awaiter(void 0, void 0, void 0, function* () {
            const manifestData = { name: 'test' };
            const manifestString = `{
				"expo": {
					"name": "old"
				}
			}`;
            const manifestMeta = {
                content: manifestString,
                filename: expo_1.MANIFEST_FILE,
                manifest: JSON.parse(manifestString).expo,
            };
            detectIndent.mockReturnValue({ indent: '\t' });
            detectNewline.mockReturnValue('\n');
            yield expo_1.writeManifest(manifestMeta, manifestData);
            expect(detectIndent).toBeCalledWith(manifestString);
            expect(detectNewline).toBeCalledWith(manifestString);
            expect(writeJson).toBeCalledWith(expo_1.MANIFEST_FILE, { expo: manifestData }, { spaces: '\t', EOL: '\n' });
        }));
        it('writes manifest file with fallback indentation', () => __awaiter(void 0, void 0, void 0, function* () {
            const manifestData = { name: 'test' };
            const manifestString = `{
				"expo": {
					"name": "old"
				}
			}`;
            const manifestMeta = {
                content: manifestString,
                filename: expo_1.MANIFEST_FILE,
                manifest: JSON.parse(manifestString).expo,
            };
            const options = {
                EOL: expo_1.DEFAULT_NEWLINE,
                spaces: expo_1.DEFAULT_INDENT,
            };
            detectIndent.mockReturnValue(undefined);
            detectNewline.mockReturnValue(undefined);
            yield expo_1.writeManifest(manifestMeta, manifestData);
            expect(detectIndent).toBeCalledWith(manifestString);
            expect(detectNewline).toBeCalledWith(manifestString);
            expect(writeJson).toBeCalledWith(expo_1.MANIFEST_FILE, { expo: manifestData }, options);
        }));
    });
    describe('#getPlatforms', () => {
        it('returns default platforms', () => {
            const platforms = expo_1.getPlatforms({ name: 'test' });
            expect(platforms).toContain('android');
            expect(platforms).toContain('ios');
        });
        it('returns defined platforms from manifest', () => {
            const platforms = ['android'];
            expect(expo_1.getPlatforms({ name: 'test', platforms })).toBe(platforms);
        });
    });
    describe('#getAndroidPlatform', () => {
        it('returns default android settings', () => {
            expect(expo_1.getAndroidPlatform({ name: 'test' })).toMatchObject({ versionCode: 0 });
        });
        it('returns defined android settings from manifest', () => {
            const android = { versionCode: 1337 };
            expect(expo_1.getAndroidPlatform({ name: 'test', android })).toMatchObject(android);
        });
    });
    describe('#getIosPlatform', () => {
        it('returns default ios settings', () => {
            expect(expo_1.getIosPlatform({ name: 'test' })).toMatchObject({ buildNumber: '' });
        });
        it('returns defined ios settings from manifest', () => {
            const ios = { buildNumber: '1.3.7' };
            expect(expo_1.getIosPlatform({ name: 'test', ios })).toMatchObject(ios);
        });
    });
});
//# sourceMappingURL=expo.test.js.map