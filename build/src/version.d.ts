import { SemVer } from 'semver';
import { ManifestMeta } from './expo';
import { Context, VersionCalculator } from './types';
/**
 * Calculate a numeric version code based on the next release and used expo version.
 * This uses the versioning specifically designed for Android version codes.
 *
 * @see https://medium.com/@maxirosson/versioning-android-apps-d6ec171cfd82
 */
export declare const getVersionCode: (next: SemVer, expo: SemVer) => number;
/**
 * Get the default (template) variables for all platforms.
 * This includes the recommended next release string and numeric version code.
 */
export declare const getDefaultVariables: (meta: ManifestMeta, context: Context) => {
    code: string | number;
    expo: SemVer | null;
    last: SemVer | null;
    next: SemVer | null;
    recommended: string;
};
/**
 * Calculate the (next) version for the "root" expo manifest version.
 * It's recommended to use the next release version string.
 */
export declare const calculateVersion: VersionCalculator;
/**
 * Calculate the (next) version for the android platform.
 * Although incremental numbers are supported, they are discouraged because of non-deterministic behaviour.
 * Its highly recommended to use the (calculatable) version code.
 */
export declare const calculateAndroidVersion: VersionCalculator;
/**
 * Calculate the (next) version for the ios platform.
 * Although incremental numbers are supported, they are discouraged because of non-deterministic behaviour.
 * Its recommended to use the next release version string.
 */
export declare const calculateIosVersion: VersionCalculator;
