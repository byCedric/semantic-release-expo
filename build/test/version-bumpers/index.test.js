"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getPlatforms = jest.fn();
const bumpPlatformAndroid = jest.fn();
const bumpPlatformIos = jest.fn();
const bumpVersion = jest.fn();
jest.doMock('../../src/expo', () => ({ getPlatforms }));
jest.doMock('../../src/version-bumpers/platform-android', () => bumpPlatformAndroid);
jest.doMock('../../src/version-bumpers/platform-ios', () => bumpPlatformIos);
jest.doMock('../../src/version-bumpers/version', () => bumpVersion);
const version_bumpers_1 = __importDefault(require("../../src/version-bumpers"));
const factory_1 = require("../factory");
describe('version-bumpers', () => {
    it('returns new manifest with bumped version', () => {
        const config = factory_1.createConfig();
        const context = factory_1.createContext({
            next: {
                gitHead: 'abc12',
                gitTag: 'v9.1.0',
                notes: 'Testing a new version',
                version: '9.1.0',
            },
        });
        const oldMeta = factory_1.createManifestMeta({ name: 'test', version: '9.0.0' });
        const newMeta = factory_1.createManifestMeta({ name: 'test', version: '9.1.9' });
        getPlatforms.mockReturnValue([]);
        bumpVersion.mockReturnValue(newMeta.manifest);
        const received = version_bumpers_1.default(oldMeta, config, context);
        expect(received).toBe(newMeta.manifest);
        expect(bumpVersion).toBeCalledWith(oldMeta, config, context);
    });
    it('returns new manifest with bumped version and platform versions', () => {
        const config = factory_1.createConfig();
        const context = factory_1.createContext({
            next: {
                gitHead: 'abc12',
                gitTag: 'v2.4.0',
                notes: 'Testing a new version',
                version: '2.4.0',
            },
        });
        const oldMeta = factory_1.createManifestMeta({
            android: { versionCode: 12 },
            ios: { buildNumber: '2.3.0' },
            name: 'test',
            version: '2.3.0',
        });
        // reuse the old manifest meta, stringified contents should match the exact file content (not updated one).
        const createPatchedManifestMeta = (meta, manifest) => (Object.assign(Object.assign({}, meta), { manifest: Object.assign(Object.assign({}, meta.manifest), manifest) }));
        const newVersionMeta = createPatchedManifestMeta(oldMeta, { version: '2.4.0' });
        const newAndroidMeta = createPatchedManifestMeta(newVersionMeta, { android: { versionCode: 13 } });
        const newIosMeta = createPatchedManifestMeta(newAndroidMeta, { ios: { buildNumber: '2.4.0' } });
        getPlatforms.mockReturnValue(['android', 'ios']);
        bumpVersion.mockReturnValue(newVersionMeta.manifest);
        bumpPlatformAndroid.mockReturnValue(newAndroidMeta.manifest);
        bumpPlatformIos.mockReturnValue(newIosMeta.manifest);
        const received = version_bumpers_1.default(oldMeta, config, context);
        expect(received).toBe(newIosMeta.manifest);
        expect(bumpVersion).toBeCalledWith(oldMeta, config, context);
        expect(bumpPlatformAndroid).toBeCalledWith(newVersionMeta, config, context);
        expect(bumpPlatformIos).toBeCalledWith(newAndroidMeta, config, context);
    });
});
//# sourceMappingURL=index.test.js.map