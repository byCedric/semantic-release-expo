import * as semver from 'semver';
import { getAndroidPlatform } from '../expo';
import { VersionBumper } from '../types';

const bumpPlatformAndroid: VersionBumper = (meta, context) => {
	const sdkVersion = semver.coerce(meta.manifest.sdkVersion || 0);
	const android = getAndroidPlatform(meta.manifest);
	const oldVersion = android.versionCode || 0;
	const nextRelease = semver.coerce(context.nextRelease!.version);
	const newVersion = sdkVersion!.major * 10000000 + nextRelease!.major * 10000 + nextRelease!.minor * 100 + nextRelease!.patch;

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
