import { getIosPlatform } from '../expo';
import { VersionBumper } from '../types';

const bumpPlatformIos: VersionBumper = (meta, context) => {
	const ios = getIosPlatform(meta.manifest);
	const buildNumber = context.nextRelease!.version;

	context.logger.log(
		'%s manifest ios version changed (%s => %s) in %s',
		'Expo',
		ios.buildNumber,
		buildNumber,
		meta.filename,
	);

	return { ...meta.manifest, ios: { ...ios, buildNumber } };
};

export default bumpPlatformIos;
