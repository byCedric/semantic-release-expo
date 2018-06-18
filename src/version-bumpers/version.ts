import { VersionBumper } from '../types';

const bumpVersion: VersionBumper = (meta, context) => {
	const version = context.nextRelease!.version;

	context.logger.log(
		'%s manifest version changed (%s => %s) in %s',
		'Expo',
		meta.manifest.version,
		version,
		meta.filename,
	);

	return { ...meta.manifest, version };
};

export default bumpVersion;
