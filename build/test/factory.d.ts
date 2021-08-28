/// <reference types="jest" />
import { Manifest, ManifestMeta } from '../src/expo';
import { Config, Context, LastRelease, NextRelease } from '../src/types';
/**
 * Create an empty object representing the config.
 * This is mostly for future configuration and not-having-to-rewrite the tests.
 */
export declare function createConfig(): Config;
/**
 * Create a context partial with a mocked logger.
 */
export declare function createContextLogger(): {
    logger: {
        error: jest.Mock<any, any>;
        log: jest.Mock<any, any>;
    };
};
/**
 * Create a context partial with some general repository options.
 */
export declare function createContextOptions(): {
    options: {
        branch: string;
        repositoryUrl: string;
        tagFormat: string;
    };
};
/**
 * Create a context partial which defines the next release.
 */
export declare function createContextNextRelease(options?: NextRelease): {
    nextRelease: {
        gitHead: string;
        gitTag: string;
        notes: string;
        version: string;
    };
};
/**
 * Create a context partial which defines the last release.
 */
export declare function createContextLastRelease(options?: LastRelease): {
    lastRelease: {
        gitHead: string;
        gitTag: string;
        version: string;
    };
};
/**
 * Create a manifest meta object containing the manifest data.
 */
export declare function createManifestMeta(manifest: Manifest): ManifestMeta;
/**
 * Create a (full) context object with logger, options and last/next releases.
 */
export declare function createContext(options?: {
    next?: NextRelease;
    last?: LastRelease;
}): Context;
