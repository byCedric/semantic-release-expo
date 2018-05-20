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

		const manifest = bumpVersion({
			name: 'test',
			version: '3.2.1',
			anything: 'else',
		}, context);

		expect(context.logger.log).toBeCalledWith('%s manifest version changed (%s => %s)', 'Expo', '3.2.1', '4.0.0');
		expect(manifest).toMatchObject({
			name: 'test',
			version: '4.0.0',
			anything: 'else',
		});
	});
});
