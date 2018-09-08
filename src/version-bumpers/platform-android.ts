import { getAndroidPlatform } from '../expo';
import { VersionBumper } from '../types';
import { calculateAndroidVersion } from '../version';

const bumpPlatformAndroid: VersionBumper = (meta, config, context) => {
	const android = getAndroidPlatform(meta.manifest);
	const newVersion = calculateAndroidVersion(meta, config, context);

	context.logger.log(
		'%s manifest android version changed (%s => %s) in %s',
		'Expo',
		android.versionCode,
		newVersion,
		meta.filename,
	);

	return { ...meta.manifest, android: { ...android, versionCode: newVersion } };
};

export default bumpPlatformAndroid;
