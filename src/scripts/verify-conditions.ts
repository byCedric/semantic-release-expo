import { SemanticMethod } from '../types';
import { readManifest } from '../expo';

const SemanticReleaseError = require('@semantic-release/error');

/**
 * Verify the configuration of this plugin.
 * This checks if an Expo `app.json` can be found.
 */
const verifyConditions: SemanticMethod = async (config, context) => {
	try {
		context.logger.log('Found %s manifest for %s', 'Expo', (await readManifest()).name);
	} catch (error) {
		throw new SemanticReleaseError('Could not load Expo manifest.', 'EINVALIDEXPOMANIFEST');
	}
};

export default verifyConditions;
