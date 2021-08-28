import { SemanticMethod } from '../types';
/**
 * Prepare the new release by updating all manifests.
 * This should update at least the `version` using the next release version name.
 * It should also update the version code and build number when available.
 */
declare const prepare: SemanticMethod;
export default prepare;
