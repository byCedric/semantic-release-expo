"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getIosPlatform = jest.fn();
const calculateIosVersion = jest.fn();
jest.doMock('../../src/expo', () => ({ getIosPlatform }));
jest.doMock('../../src/version', () => ({ calculateIosVersion }));
const platform_ios_1 = __importDefault(require("../../src/version-bumpers/platform-ios"));
const factory_1 = require("../factory");
describe('version-bumpers/platform-ios', () => {
    it('returns new manifest with bumped ios version', () => {
        const config = factory_1.createConfig();
        const context = factory_1.createContext();
        const meta = factory_1.createManifestMeta({
            android: { versionCode: 6 },
            ios: { buildNumber: context.lastRelease.version },
            name: 'test',
            version: context.lastRelease.version,
        });
        getIosPlatform.mockReturnValue(meta.manifest.ios);
        calculateIosVersion.mockReturnValue('newversion');
        const manifest = platform_ios_1.default(meta, config, context);
        expect(getIosPlatform).toBeCalledWith(meta.manifest);
        expect(calculateIosVersion).toBeCalledWith(meta, config, context);
        expect(context.logger.log).toBeCalledWith('%s manifest ios version changed (%s => %s) in %s', 'Expo', meta.manifest.ios.buildNumber, 'newversion', meta.filename);
        expect(manifest).toMatchObject({
            android: { versionCode: 6 },
            ios: { buildNumber: 'newversion' },
            name: 'test',
            version: context.lastRelease.version,
        });
    });
});
//# sourceMappingURL=platform-ios.test.js.map