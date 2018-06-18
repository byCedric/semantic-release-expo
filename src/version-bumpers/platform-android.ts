import { getAndroidPlatform } from '../expo';
import { VersionBumper } from '../types';

const bumpPlatformAndroid: VersionBumper = (meta, context) => {
	const android = getAndroidPlatform(meta.manifest);
	const oldVersion = android.versionCode || 0;
	const newVersion = oldVersion + 1;

	context.logger.log(
		'%s manifest android version changed (%s => %s) in %s',
		'Expo',
		oldVersion,
		newVersion,
		meta.filename,
	);

	return { ...meta.manifest, android: { ...android, versionCode: newVersion } };
};

export default bumpPlatformAndroid;
