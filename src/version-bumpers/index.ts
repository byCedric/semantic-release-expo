import { getPlatforms } from '../expo';
import { VersionBumper } from '../types';

import bumpAndroid from './platform-android';
import bumpIos from './platform-ios';
import bumpVersion from './version';

/**
 * Update all versions from the manifest and return an updated version.
 * This will check if the manifest supports android and/or ios before applying.
 */
const bumpVersions: VersionBumper = (oldManifest, context) => {
	const platforms = getPlatforms(oldManifest);
	let newManifest = bumpVersion(oldManifest, context);

	if (platforms.indexOf('android') >= 0) {
		newManifest = bumpAndroid(newManifest, context);
	}

	if (platforms.indexOf('ios') >= 0) {
		newManifest = bumpIos(newManifest, context);
	}

	return newManifest;
};

export default bumpVersions;
