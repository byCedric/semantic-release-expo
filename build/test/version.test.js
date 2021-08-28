"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodashTemplate = jest.fn();
const getVersionTemplates = jest.fn();
const getAndroidPlatform = jest.fn();
const getIosPlatform = jest.fn();
jest.doMock('lodash', () => ({ template: lodashTemplate }));
jest.doMock('../src/config', () => ({ getVersionTemplates }));
jest.doMock('../src/expo', () => ({ getAndroidPlatform, getIosPlatform }));
const semver_1 = require("semver");
const version_1 = require("../src/version");
const factory_1 = require("./factory");
describe('version', () => {
    describe('#getVersionCode', () => {
        it('calculates new version with expo and next release', () => {
            expect(version_1.getVersionCode(semver_1.coerce('1.5.9'), semver_1.coerce('29.0.1'))).toBe(290010509);
            expect(version_1.getVersionCode(semver_1.coerce('0.2.1'), semver_1.coerce('25.4.0'))).toBe(250000201);
            expect(version_1.getVersionCode(semver_1.coerce('4.10.20'), semver_1.coerce('30.0.0'))).toBe(300041020);
            expect(version_1.getVersionCode(semver_1.coerce('10.20.30'), semver_1.coerce('27.10.30'))).toBe(270102030);
        });
    });
    describe('#getDefaultVariables', () => {
        it('returns expo version, last and next release, recommended version and (numeric) version code', () => {
            const meta = factory_1.createManifestMeta({ name: 'test-app', sdkVersion: '29.0.1' });
            const context = factory_1.createContext({
                last: {
                    gitHead: '192aqs',
                    gitTag: 'v2.5.12',
                    version: '2.5.12',
                },
                next: {
                    gitHead: '271abq',
                    gitTag: 'v3.0.0',
                    notes: 'New major release',
                    version: '3.0.0',
                },
            });
            expect(version_1.getDefaultVariables(meta, context)).toMatchObject({
                code: 290030000,
                expo: semver_1.coerce('29.0.1'),
                last: semver_1.coerce('2.5.12'),
                next: semver_1.coerce('3.0.0'),
                recommended: '3.0.0',
            });
        });
    });
    const sharedConfig = {};
    const sharedMeta = factory_1.createManifestMeta({ name: 'test-app', sdkVersion: '29.1.0' });
    const sharedContext = factory_1.createContext({
        last: {
            gitHead: '12j1ad',
            gitTag: 'v4.5.1',
            version: '4.5.1',
        },
        next: {
            gitHead: 'kl1dsq',
            gitTag: 'v4.6.0',
            notes: 'New minor release',
            version: '4.6.0',
        },
    });
    const sharedVariables = {
        code: 290040600,
        expo: semver_1.coerce('29.1.0'),
        last: semver_1.coerce('4.5.1'),
        next: semver_1.coerce('4.6.0'),
        recommended: '4.6.0',
    };
    describe('#calculateVersion', () => {
        it('returns new version using template', () => {
            const templateCompiler = jest.fn();
            getVersionTemplates.mockReturnValue({ version: '${next.raw}' });
            lodashTemplate.mockReturnValue(templateCompiler);
            templateCompiler.mockReturnValue('4.6.0');
            expect(version_1.calculateVersion(sharedMeta, sharedConfig, sharedContext)).toMatch('4.6.0');
            expect(lodashTemplate).toBeCalledWith('${next.raw}');
            expect(templateCompiler).toBeCalledWith(Object.assign(Object.assign({}, sharedVariables), { increment: 1 }));
        });
        it('returns proper incremental versions', () => {
            const templateCompiler = jest.fn();
            const meta = factory_1.createManifestMeta({
                name: 'test-app',
                sdkVersion: '28.0.0',
                version: '8',
            });
            getVersionTemplates.mockReturnValue({ version: '${increment}' });
            lodashTemplate.mockReturnValue(templateCompiler);
            templateCompiler.mockReturnValue('9');
            expect(version_1.calculateVersion(meta, sharedConfig, sharedContext)).toMatch('9');
            expect(lodashTemplate).toBeCalledWith('${increment}');
            expect(templateCompiler).toBeCalledWith(Object.assign(Object.assign({}, sharedVariables), { code: 280040600, expo: semver_1.coerce('28.0.0'), increment: 9 }));
        });
    });
    describe('#calculateAndroidVersion', () => {
        it('returns new version using template', () => {
            const templateCompiler = jest.fn();
            getVersionTemplates.mockReturnValue({ android: '${code}' });
            getAndroidPlatform.mockReturnValue({ versionCode: '290040501' });
            lodashTemplate.mockReturnValue(templateCompiler);
            templateCompiler.mockReturnValue('290040600');
            expect(version_1.calculateAndroidVersion(sharedMeta, sharedConfig, sharedContext)).toMatch('290040600');
            expect(lodashTemplate).toBeCalledWith('${code}');
            expect(templateCompiler).toBeCalledWith(Object.assign(Object.assign({}, sharedVariables), { increment: 290040502, recommended: sharedVariables.code }));
        });
    });
    describe('#calculateIosVersion', () => {
        it('returns new version using template', () => {
            const templateCompiler = jest.fn();
            getVersionTemplates.mockReturnValue({ ios: '${recommended}' });
            getIosPlatform.mockReturnValue({ buildNumber: '4.5.1' });
            lodashTemplate.mockReturnValue(templateCompiler);
            templateCompiler.mockReturnValue('4.6.0');
            expect(version_1.calculateIosVersion(sharedMeta, sharedConfig, sharedContext)).toMatch('4.6.0');
            expect(lodashTemplate).toBeCalledWith('${recommended}');
            expect(templateCompiler).toBeCalledWith(Object.assign(Object.assign({}, sharedVariables), { increment: 1 }));
        });
        it('returns proper incremental versions', () => {
            const templateCompiler = jest.fn();
            const meta = factory_1.createManifestMeta({
                name: 'test-app',
                sdkVersion: '28.0.0',
                version: '8',
            });
            getVersionTemplates.mockReturnValue({ ios: '${increment}' });
            getIosPlatform.mockReturnValue({ buildNumber: '8' });
            lodashTemplate.mockReturnValue(templateCompiler);
            templateCompiler.mockReturnValue('9');
            expect(version_1.calculateIosVersion(meta, sharedConfig, sharedContext)).toMatch('9');
            expect(lodashTemplate).toBeCalledWith('${increment}');
            expect(templateCompiler).toBeCalledWith(Object.assign(Object.assign({}, sharedVariables), { code: 280040600, expo: semver_1.coerce('28.0.0'), increment: 9 }));
        });
    });
});
//# sourceMappingURL=version.test.js.map