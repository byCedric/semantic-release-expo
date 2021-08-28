import { VersionBumper } from '../types';
/**
 * Update all versions from the manifest and return an updated version.
 * This will check if the manifest supports android and/or ios before applying.
 */
declare const bumpVersions: VersionBumper;
export default bumpVersions;
