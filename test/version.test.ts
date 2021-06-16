const lodashTemplate = jest.fn();
const getVersionTemplates = jest.fn();
const getAndroidPlatform = jest.fn();
const getIosPlatform = jest.fn();

jest.doMock('lodash', () => ({ template: lodashTemplate }));
jest.doMock('../src/config', () => ({ getVersionTemplates }));
jest.doMock('../src/expo', () => ({ getAndroidPlatform, getIosPlatform }));

import { coerce } from 'semver';
import {
	calculateAndroidVersion,
	calculateIosVersion,
	calculateVersion,
	getDefaultVariables,
	getVersionCode,
} from '../src/version';

import { createContext, createManifestMeta } from './factory';

describe('version', () => {
	describe('#getVersionCode', () => {
		it('calculates new version with expo and next release', () => {
			expect(getVersionCode(coerce('1.5.9')!, coerce('29.0.1')!)).toBe(290010509);
			expect(getVersionCode(coerce('0.2.1')!, coerce('25.4.0')!)).toBe(250000201);
			expect(getVersionCode(coerce('4.10.20')!, coerce('30.0.0')!)).toBe(300041020);
			expect(getVersionCode(coerce('10.20.30')!, coerce('27.10.30')!)).toBe(270102030);
		});
	});

	describe('#getDefaultVariables', () => {
		it('returns expo version, last and next release, recommended version and (numeric) version code', () => {
			const meta = createManifestMeta({ name: 'test-app', sdkVersion: '29.0.1' });
			const context = createContext({
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

			expect(getDefaultVariables(meta, context)).toMatchObject({
				code: 290030000,
				expo: coerce('29.0.1'),
				last: coerce('2.5.12'),
				next: {...coerce('3.0.0'),
					includePrerelease: true,
					options: {includePrerelease: true}
				},
				recommended: '3.0.0',
			});
		});
	});

	const sharedConfig = {};
	const sharedMeta = createManifestMeta({ name: 'test-app', sdkVersion: '29.1.0' });
	const sharedContext = createContext({
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
		expo: coerce('29.1.0'),
		last: coerce('4.5.1'),
		next: {...coerce('4.6.0'),
			includePrerelease: true,
			options: {includePrerelease: true}
		},
		recommended: '4.6.0',
	};

	describe('#calculateVersion', () => {
		it('returns new version using template', () => {
			const templateCompiler = jest.fn();

			getVersionTemplates.mockReturnValue({ version: '${next.raw}' });
			lodashTemplate.mockReturnValue(templateCompiler);
			templateCompiler.mockReturnValue('4.6.0');

			expect(calculateVersion(sharedMeta, sharedConfig, sharedContext)).toMatch('4.6.0');
			expect(lodashTemplate).toBeCalledWith('${next.raw}');
			expect(templateCompiler).toBeCalledWith({ ...sharedVariables, increment: 1 });
		});

		it('returns proper incremental versions', () => {
			const templateCompiler = jest.fn();
			const meta = createManifestMeta({
				name: 'test-app',
				sdkVersion: '28.0.0',
				version: '8',
			});

			getVersionTemplates.mockReturnValue({ version: '${increment}' });
			lodashTemplate.mockReturnValue(templateCompiler);
			templateCompiler.mockReturnValue('9');

			expect(calculateVersion(meta, sharedConfig, sharedContext)).toMatch('9');
			expect(lodashTemplate).toBeCalledWith('${increment}');
			expect(templateCompiler).toBeCalledWith({
				...sharedVariables,
				code: 280040600,
				expo: coerce('28.0.0'),
				increment: 9,
			});
		});
	});

	describe('#calculateAndroidVersion', () => {
		it('returns new version using template', () => {
			const templateCompiler = jest.fn();

			getVersionTemplates.mockReturnValue({ android: '${code}' });
			getAndroidPlatform.mockReturnValue({ versionCode: '290040501' });
			lodashTemplate.mockReturnValue(templateCompiler);
			templateCompiler.mockReturnValue('290040600');

			expect(calculateAndroidVersion(sharedMeta, sharedConfig, sharedContext)).toMatch('290040600');
			expect(lodashTemplate).toBeCalledWith('${code}');
			expect(templateCompiler).toBeCalledWith({
				...sharedVariables,
				increment: 290040502,
				recommended: sharedVariables.code,
			});
		});
	});

	describe('#calculateIosVersion', () => {
		it('returns new version using template', () => {
			const templateCompiler = jest.fn();

			getVersionTemplates.mockReturnValue({ ios: '${recommended}' });
			getIosPlatform.mockReturnValue({ buildNumber: '4.5.1' });
			lodashTemplate.mockReturnValue(templateCompiler);
			templateCompiler.mockReturnValue('4.6.0');

			expect(calculateIosVersion(sharedMeta, sharedConfig, sharedContext)).toMatch('4.6.0');
			expect(lodashTemplate).toBeCalledWith('${recommended}');
			expect(templateCompiler).toBeCalledWith({ ...sharedVariables, increment: 1 });
		});

		it('returns proper incremental versions', () => {
			const templateCompiler = jest.fn();
			const meta = createManifestMeta({
				name: 'test-app',
				sdkVersion: '28.0.0',
				version: '8',
			});

			getVersionTemplates.mockReturnValue({ ios: '${increment}' });
			getIosPlatform.mockReturnValue({ buildNumber: '8' });
			lodashTemplate.mockReturnValue(templateCompiler);
			templateCompiler.mockReturnValue('9');

			expect(calculateIosVersion(meta, sharedConfig, sharedContext)).toMatch('9');
			expect(lodashTemplate).toBeCalledWith('${increment}');
			expect(templateCompiler).toBeCalledWith({
				...sharedVariables,
				code: 280040600,
				expo: coerce('28.0.0'),
				increment: 9,
			});
		});
	});
});
