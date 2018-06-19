import { getManifestFiles } from '../config';
import { readManifests, writeManifest } from '../expo';
import { SemanticMethod } from '../types';
import bumpVersions from '../version-bumpers';

const SemanticReleaseError = require('@semantic-release/error');

/**
 * Prepare the new release by updating all manifests.
 * This should update at least the `version` using the next release version name.
 * It should also update the version code and build number when available.
 */
const prepare: SemanticMethod = async (config, context) => {
	const files = await readManifests(getManifestFiles(config));
	const writes = files.map(meta => (
		writeManifest(meta, bumpVersions(meta, context)).then(() => {
			context.logger.log(
				'New %s manifest written for %s to %s',
				'Expo',
				meta.manifest.name,
				meta.filename,
			);
		})
	));

	try {
		await Promise.all(writes);
	} catch (error) {
		throw new SemanticReleaseError('Could not write Expo manifest(s)', 'EWRITEEXPOMANIFEST');
	}

	context.logger.log('Updated all %s manifests!', writes.length);
};

export default prepare;
