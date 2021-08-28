"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAndroidPlatform = jest.fn();
const calculateAndroidVersion = jest.fn();
jest.doMock('../../src/expo', () => ({ getAndroidPlatform }));
jest.doMock('../../src/version', () => ({ calculateAndroidVersion }));
const platform_android_1 = __importDefault(require("../../src/version-bumpers/platform-android"));
const factory_1 = require("../factory");
describe('version-bumpers/platform-android', () => {
    it('returns new manifest with bumped android version', () => {
        const config = factory_1.createConfig();
        const context = factory_1.createContext({
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
        const meta = factory_1.createManifestMeta({
            android: { versionCode: 290010200 },
            ios: { buildNumber: '1.2.0' },
            name: 'test',
            sdkVersion: '29.0.0',
            version: '1.2.0',
        });
        getAndroidPlatform.mockReturnValue(meta.manifest.android);
        calculateAndroidVersion.mockReturnValue('290010300');
        const manifest = platform_android_1.default(meta, config, context);
        expect(getAndroidPlatform).toBeCalledWith(meta.manifest);
        expect(calculateAndroidVersion).toBeCalledWith(meta, config, context);
        expect(context.logger.log).toBeCalledWith('%s manifest android version changed (%s => %s) in %s', 'Expo', meta.manifest.android.versionCode, 290010300, meta.filename);
        expect(manifest).toMatchObject({
            android: { versionCode: 290010300 },
            ios: { buildNumber: '1.2.0' },
            name: 'test',
            sdkVersion: '29.0.0',
            version: '1.2.0',
        });
    });
});
//# sourceMappingURL=platform-android.test.js.map