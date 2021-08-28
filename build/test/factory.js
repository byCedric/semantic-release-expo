"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create an empty object representing the config.
 * This is mostly for future configuration and not-having-to-rewrite the tests.
 */
function createConfig() {
    return {};
}
exports.createConfig = createConfig;
/**
 * Create a context partial with a mocked logger.
 */
function createContextLogger() {
    return {
        logger: {
            error: jest.fn(),
            log: jest.fn(),
        },
    };
}
exports.createContextLogger = createContextLogger;
/**
 * Create a context partial with some general repository options.
 */
function createContextOptions() {
    return {
        options: {
            branch: 'master',
            repositoryUrl: 'https://github.com/bycedric/semantic-release-expo',
            tagFormat: '${version}',
        },
    };
}
exports.createContextOptions = createContextOptions;
/**
 * Create a context partial which defines the next release.
 */
function createContextNextRelease(options) {
    return {
        nextRelease: {
            gitHead: options ? options.gitHead : 'abc234',
            gitTag: options ? options.version : 'v1.2.0',
            notes: options ? options.notes : 'Testing notes',
            version: options ? options.version : '1.2.0',
        },
    };
}
exports.createContextNextRelease = createContextNextRelease;
/**
 * Create a context partial which defines the last release.
 */
function createContextLastRelease(options) {
    return {
        lastRelease: {
            gitHead: options ? options.gitHead : 'abc123',
            gitTag: options ? options.version : 'v1.1.3',
            version: options ? options.version : '1.1.3',
        },
    };
}
exports.createContextLastRelease = createContextLastRelease;
/**
 * Create a manifest meta object containing the manifest data.
 */
function createManifestMeta(manifest) {
    return {
        content: JSON.stringify(manifest),
        filename: 'app.json',
        manifest,
    };
}
exports.createManifestMeta = createManifestMeta;
/**
 * Create a (full) context object with logger, options and last/next releases.
 */
function createContext(options = {}) {
    return Object.assign(Object.assign(Object.assign(Object.assign({}, createContextLogger()), createContextOptions()), createContextNextRelease(options.next)), createContextLastRelease(options.last));
}
exports.createContext = createContext;
//# sourceMappingURL=factory.js.map