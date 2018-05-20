import { VersionBumper } from '../types';

const bumpVersion: VersionBumper = (manifest, context) => {
	const version = context.nextRelease!.version;

	context.logger.log('%s manifest version changed (%s => %s)', 'Expo', manifest.version, version);

	return { ...manifest, version };
};

export default bumpVersion;
