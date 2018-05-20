import { readManifest, writeManifest } from '../expo';
import { SemanticMethod } from '../types';
import bumpVersions from '../version-bumpers';

/**
 * Prepare the new release by updating the manifest.
 * This should update at least the `version` using the next release version name.
 * It should also update the version code and build number when available.
 */
const prepare: SemanticMethod = async (config, context) => {
	const oldManifest = await readManifest();
	const newManifest = bumpVersions(oldManifest, context);

	await writeManifest(newManifest);

	context.logger.log('New %s manifest written', 'Expo');
};

export default prepare;
