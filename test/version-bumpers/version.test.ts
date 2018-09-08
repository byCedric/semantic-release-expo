const calculateVersion = jest.fn();

jest.doMock('../../src/version', () => ({ calculateVersion }));

import bumpVersion from '../../src/version-bumpers/version';
import { createContext, createConfig, createManifestMeta } from '../factory';

describe('version-bumpers/version', () => {
	it('returns new manifest with bumped version', () => {
		const config = createConfig();
		const context = createContext();
		const meta = createManifestMeta({
			name: 'test',
			version: context.lastRelease!.version,
			anything: 'else',
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
			name: 'test',
			version: 'newversion',
			anything: 'else',
		});
	});
});
