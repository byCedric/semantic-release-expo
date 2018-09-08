import { getManifestFiles } from '../config';
import { logManifestFromError, readManifests, writeManifest } from '../expo';
import { SemanticMethod } from '../types';
import bumpVersions from '../version-bumpers';

// tslint:disable-next-line:no-var-requires
const SemanticReleaseError = require('@semantic-release/error');

/**
 * Prepare the new release by updating all manifests.
 * This should update at least the `version` using the next release version name.
 * It should also update the version code and build number when available.
 */
const prepare: SemanticMethod = async (config, context) => {
	const files = await readManifests(getManifestFiles(config));
	const writes = files.map((meta) => (
		writeManifest(meta, bumpVersions(meta, config, context)).then(() => {
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
		logManifestFromError(context, error);

		throw new SemanticReleaseError(
			'Could not write Expo manifest(s)',
			'EWRITEEXPOMANIFEST',
			error.message,
		);
	}

	context.logger.log('Updated all %s manifests!', writes.length);
};

export default prepare;
