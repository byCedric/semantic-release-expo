import bumpVersion from '../../src/version-bumpers/version';

describe('version-bumpers/version', () => {
	it('returns new manifest with bumped version', () => {
		const context = {
			logger: {
				log: jest.fn(),
				error: jest.fn(),
			},
			nextRelease: {
				version: '4.0.0',
				gitTag: 'v4.0.0',
				gitHead: 'abc12',
				notes: 'Testing a new version',
			},
		};

		const oldManifest = {
			name: 'test',
			version: '3.2.1',
			anything: 'else',
		};

		const meta = {
			filename: 'app.json',
			content: JSON.stringify(oldManifest),
			manifest: oldManifest,
		};

		const manifest = bumpVersion(meta, context);

		expect(context.logger.log).toBeCalledWith(
			'%s manifest version changed (%s => %s) in %s',
			'Expo',
			'3.2.1',
			'4.0.0',
			'app.json',
		);

		expect(manifest).toMatchObject({
			name: 'test',
			version: '4.0.0',
			anything: 'else',
		});
	});
});
