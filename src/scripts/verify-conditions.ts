import { getManifestFiles } from '../config';
import { readManifests } from '../expo';
import { SemanticMethod } from '../types';

const SemanticReleaseError = require('@semantic-release/error');

/**
 * Verify the configuration of this plugin.
 * This checks if an Expo `app.json` can be found.
 */
const verifyConditions: SemanticMethod = async (config, context) => {
	try {
		(await readManifests(getManifestFiles(config))).forEach(
			meta => context.logger.log('Found %s manifest for %s in %s', 'Expo', meta.manifest.name, meta.filename)
		);
	} catch (error) {
		if (error.expo) {
			context.logger.log('Error encountered for %s manifest %s', 'Expo', error.expo );
		}

		throw new SemanticReleaseError('Could not load Expo manifest(s).', 'EINVALIDEXPOMANIFEST', error.message);
	}
};

export default verifyConditions;
