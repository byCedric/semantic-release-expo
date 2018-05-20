import { getAndroidPlatform } from '../expo';
import { VersionBumper } from '../types';

const bumpPlatformAndroid: VersionBumper = (manifest, context) => {
	const android = getAndroidPlatform(manifest);
	const oldVersion = android.versionCode || 0;
	const newVersion = oldVersion + 1;

	context.logger.log('%s manifest android version changed (%s => %s)', 'Expo', oldVersion, newVersion);

	return { ...manifest, android: { ...android, versionCode: newVersion } };
};

export default bumpPlatformAndroid;
