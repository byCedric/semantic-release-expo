"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const calculateVersion = jest.fn();
jest.doMock('../../src/version', () => ({ calculateVersion }));
const version_1 = __importDefault(require("../../src/version-bumpers/version"));
const factory_1 = require("../factory");
describe('version-bumpers/version', () => {
    it('returns new manifest with bumped version', () => {
        const config = factory_1.createConfig();
        const context = factory_1.createContext();
        const meta = factory_1.createManifestMeta({
            anything: 'else',
            name: 'test',
            version: context.lastRelease.version,
        });
        calculateVersion.mockReturnValue('newversion');
        const manifest = version_1.default(meta, config, context);
        expect(calculateVersion).toBeCalledWith(meta, config, context);
        expect(context.logger.log).toBeCalledWith('%s manifest version changed (%s => %s) in %s', 'Expo', meta.manifest.version, 'newversion', meta.filename);
        expect(manifest).toMatchObject({
            anything: 'else',
            name: 'test',
            version: 'newversion',
        });
    });
});
//# sourceMappingURL=version.test.js.map