import { getManifestFiles, getPrepareConfig, inheritPrepareConfig } from '../src/config';
import { MANIFEST_FILE } from '../src/expo';

describe('config', () => {
	describe('#getManifestFiles', () => {
		it('returns default manifest name when no config is set', () => {
			expect(getManifestFiles({})).toEqual(expect.arrayContaining([MANIFEST_FILE]));
		});

		it('returns default manifest name when empty manifest config is set', () => {
			expect(getManifestFiles({ manifests: [] })).toEqual(expect.arrayContaining([MANIFEST_FILE]));
		});

		it('returns manifests configuration', () => {
			const manifests = ['app.staging.json', 'app.production.json'];

			expect(getManifestFiles({ manifests })).toEqual(expect.arrayContaining(manifests));
		})
	});

	const createContextWithPrepare = (prepare: any) => ({
		options: {
			prepare,
			branch: 'master',
			repositoryUrl: 'https://github.com/bycedric/semantic-release-expo',
			tagFormat: '${version}',
		},
		logger: {
			log: jest.fn(),
			error: jest.fn(),
		},
	});

	describe('#getPrepareConfig', () => {
		it('returns nothing when prepare configuration is not defined', () => {
			const contextWithoutPrepare = createContextWithPrepare(undefined);
			const contextWithSinglePrepare = createContextWithPrepare({ path: '@semantic-release/npm' });
			const contextWithPrepare = createContextWithPrepare([
				{ path: '@semantic-release/changelog' },
				{ path: '@semantic-release/npm' },
			]);

			expect(getPrepareConfig(contextWithoutPrepare)).toBeUndefined();
			expect(getPrepareConfig(contextWithSinglePrepare)).toBeUndefined();
			expect(getPrepareConfig(contextWithPrepare)).toBeUndefined();
		});

		it('returns prepare configuration from context if defined', () => {
			const manifests = ['app.production.json', 'app.staging.json'];
			const context = createContextWithPrepare([
				{ path: '@semantic-release/changelog' },
				{ path: '@semantic-release/npm' },
				{ path: 'semantic-release-expo', manifests },
			]);

			expect(getPrepareConfig(context)).toMatchObject({ manifests });
		});
	});

	describe('#inheritPrepareConfig', () => {
		it('returns verify conditions configuration if defined', () => {
			const config = { manifests: ['app.json'] };
			const context = createContextWithPrepare([
				{ path: '@semantic-release/changelog' },
				{ path: '@semantic-release/npm' },
				{
					path: 'semantic-release-expo',
					manifests: ['app.production.json', 'app.staging.json'],
				},
			]);

			expect(inheritPrepareConfig(config, context)).toMatchObject(config);
		});

		it('returns new configuration when prepare is defined and verify conditions is not', () => {
			const config = {};
			const manifests = ['app.production.json', 'app.staging.json'];
			const context = createContextWithPrepare([
				{ path: '@semantic-release/changelog' },
				{ path: '@semantic-release/npm' },
				{ path: 'semantic-release-expo', manifests },
			]);

			expect(inheritPrepareConfig(config, context)).toMatchObject({ manifests });
		});

		it('returns empty configuration when both prepare and verify conditions are not defined', () => {
			const config = {};
			const context = createContextWithPrepare([
				{ path: '@semantic-release/changelog' },
				{ path: '@semantic-release/npm' },
			]);

			expect(inheritPrepareConfig(config, context)).toMatchObject({});
		});
	});
});
