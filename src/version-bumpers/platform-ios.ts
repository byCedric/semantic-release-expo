import { getIosPlatform } from '../expo';
import { VersionBumper } from '../types';

const bumpPlatformIos: VersionBumper = (manifest, context) => {
	const ios = getIosPlatform(manifest);
	const buildNumber = context.nextRelease!.version;

	context.logger.log('%s manifest ios version changed (%s => %s)', 'Expo', ios.buildNumber, buildNumber);

	return { ...manifest, ios: { ...ios, buildNumber } };
};

export default bumpPlatformIos;
