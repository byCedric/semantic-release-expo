const calculateVersion = jest.fn();

jest.doMock('../../src/version', () => ({ calculateVersion }));

import bumpVersion from '../../src/version-bumpers/version';
import { createConfig, createContext, createManifestMeta } from '../factory';

describe('version-bumpers/version', () => {
	it('returns new manifest with bumped version', () => {
		const config = createConfig();
		const context = createContext();
		const meta = createManifestMeta({
			anything: 'else',
			name: 'test',
			version: context.lastRelease!.version,
		});

		calculateVersion.mockReturnValue('newversion');

		const manifest = bumpVersion(meta, config, context);

		expect(calculateVersion).toBeCalledWith(meta, config, context);
		expect(context.logger.log).toBeCalledWith(
			'%s manifest version changed (%s => %s) in %s',
			'Expo',
			meta.manifest.version,
			'newversion',
			meta.filename,
		);

		expect(manifest).toMatchObject({
			anything: 'else',
			name: 'test',
			version: 'newversion',
		});
	});
});
