import { getPlatforms } from '../expo';
import { VersionBumper } from '../types';

import bumpAndroid from './platform-android';
import bumpIos from './platform-ios';
import bumpVersion from './version';

/**
 * Update all versions from the manifest and return an updated version.
 * This will check if the manifest supports android and/or ios before applying.
 */
const bumpVersions: VersionBumper = (meta, config, context) => {
	const platforms = getPlatforms(meta.manifest);
	let newManifest = bumpVersion(meta, config, context);

	if (platforms.indexOf('android') >= 0) {
		newManifest = bumpAndroid({ ...meta, manifest: newManifest }, config, context);
	}

	if (platforms.indexOf('ios') >= 0) {
		newManifest = bumpIos({ ...meta, manifest: newManifest }, config, context);
	}

	return newManifest;
};

export default bumpVersions;
