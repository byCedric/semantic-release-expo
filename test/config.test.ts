import { getManifestFiles } from '../src/config';
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
});
