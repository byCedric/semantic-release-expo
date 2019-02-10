# Expo - Semantic Release

[![Latest Release](https://img.shields.io/github/release/byCedric/semantic-release-expo/all.svg?style=flat-square)](https://github.com/byCedric/semantic-release-expo/releases)
[![Build Status](https://img.shields.io/travis/com/byCedric/semantic-release-expo/master.svg?style=flat-square)](https://travis-ci.com/byCedric/semantic-release-expo)
[![Codecov coverage](https://img.shields.io/codecov/c/github/byCedric/semantic-release-expo.svg?style=flat-square)](https://codecov.io/gh/byCedric/semantic-release-expo)
[![Code Climate grade](https://img.shields.io/codeclimate/maintainability/byCedric/semantic-release-expo.svg?style=flat-square)](https://codeclimate.com/github/byCedric/semantic-release-expo)

An [Expo][expo] implementation for [semantic release][semantic-release], so you don't have to bother.

![Example](docs/terminal.svg)

## How it works

Semantic release will first determine a new version based on your likings. 
This plugin will then search for your [Expo manifest(s)][expo-manifest] and update it accordingly. 
Not only will this update the [`version`][expo-version] property within the manifest. 
It will also update the [Android `versionCode`][expo-version-android] and [iOS `buildNumber`][expo-version-ios] platform too, based on the [configuration](#configuration).

### Verify Conditions

Before such a smooth, carefree release can take place, the plugin must validate the existence of a manifest. 
This check takes place in the [verify condition][semantic-release-steps] step of semantic release.
The name of the Expo app, defined in the [`name` property][expo-name], is dumped to console to provide some feedback for successful validation.

### Prepare

This plugin writes the actual changes to the manifest during preparation.
After this step, you can [publish to Expo][expo-publish], [create a new build][expo-build] or add the changes in a [release commit][semantic-release-commit].
The [`version` property][expo-version] within the manifest is always updated. 
All of the platform specific changes are only applied when the platform is enabled.

> It is highly recommended to add the Expo manifest (`app.json`) to the [list of assets][semantic-release-assets] to include in the release commit.

## Usage

Here is an example configuration with automated changelogs, `package.json` versions, Expo and git release commits.

```json
{
    "verifyConditions": [
        "semantic-release-expo",
        "@semantic-release/changelog",
        "@semantic-release/git",
        "@semantic-release/npm"
    ],
    "prepare": [
        "semantic-release-expo",
        "@semantic-release/changelog",
        "@semantic-release/npm",
        {
            "path": "@semantic-release/git",
            "assets": [
                "CHANGELOG.md",
                "package.json",
                "package-lock.json",
                "app.json"
            ]
        }
    ],
    "publish": false,
    "success": false,
    "fail": false
}
```

## Configuration

By default this plugin uses configuration that should work straight out of the box.
Unfortunately, all apps are different and sometimes requires a specific release flow.
To satisfy these needs, you can customize some of these settings below.

### Multiple manifests

Normally, an Expo app should have a single manifest located at `/app.json`.
But you might have good reasons to use non-standard or multiple manifests.
For example, if you need to [create multiple versions/flavours and allow then to work side-by-side][info-multiple-manifests], you need multiple manifests.
To configure this plugin, you can provide a list of manifests to update.

```json
{
    "prepare": [
        {
            "path": "semantic-release-expo",
            "manifests": [
                "app.test.json",
                "app.staging.json",
                "app.production.json",
            ]
        }
    ]
}
```

> `manifests` accepts either a single string, or a list of strings.

### Version templates

Unfortunately, right now there is no "universal" versioning which can be used across all platforms.
For exmaple, iOS can simply use the exact semantic version (e.g. `2.5.1`) but [Android can't][info-android-semver].
To allow multiple "tactics" or personal favorites, you can change the so called "versioning templates".
These templates uses [lodash template][lodash-template] to build new versions.
Every version string, `version`, `Android versionCode` and `iOS buildNumber` can be modified independently.

```json
{
    "prepare": [
        {
            "path": "semantic-release-expo",
            "versions": {
                "version": "${next.raw}",
                "android": "${code}",
                "ios": "${next.raw}"
            }
        }
    ]
}
```

> `versions` accepts either a single string for all versions, or a (partial) object with templates. By default the `${recommended}` template is used.

#### Version templates variables

Currently the following variables are available within the templates.

name        | type                    | description
---         | ---                     | ---
expo        | [`SemVer`][info-semver] | The semver-coerced Expo SDK version
last        | [`SemVer`][info-semver] | The semver-coerced last release version
next        | [`SemVer`][info-semver] | The semver coerced next release version
code        | `Number`                | The (Android) version code, using the [versioning approach by Maxi Rosson][info-android-versioncode]
increment   | `Number`                | An incremented number of the previous version, [discouraged because of non-deterministic behaviour][repo-issue-increments].
recommended | `String` or `Number`    | _differs per versioning/platform, listed below_

##### Recommended per version type

version                                     | example     | description
---                                         | ---         | ---
[version][expo-version]                     | `1.2.3`     | The "raw" next release version (also available in `${next.raw}`)
[Android versionCode][expo-version-android] | `290010203` | The [versioning approach by Maxi Rosson][info-android-versioncode] (same as `${code}`)
[iOS buildNumber][expo-version-ios]         | `1.2.3`     | The "raw" next release version (also available in `${next.raw}`)

> In these examples Expo SDK `29.x.x` and SemVer `1.2.3` is used.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

[expo]: https://expo.io/
[expo-build]: https://docs.expo.io/versions/latest/distribution/building-standalone-apps
[expo-manifest]: https://docs.expo.io/versions/latest/workflow/configuration
[expo-name]: https://docs.expo.io/versions/latest/workflow/configuration#name
[expo-publish]: https://docs.expo.io/versions/latest/workflow/publishing
[expo-version]: https://docs.expo.io/versions/latest/workflow/configuration#version
[expo-version-android]: https://docs.expo.io/versions/latest/workflow/configuration#android
[expo-version-ios]: https://docs.expo.io/versions/latest/workflow/configuration#ios
[semantic-release]: https://github.com/semantic-release/semantic-release
[semantic-release-assets]: https://github.com/semantic-release/git#assets
[semantic-release-commit]: https://github.com/semantic-release/git#prepare
[semantic-release-steps]: https://github.com/semantic-release/semantic-release#release-steps
[lodash-template]: https://www.npmjs.com/package/lodash.template
[info-multiple-manifests]: https://blog.expo.io/setting-up-expo-and-bitbucket-pipelines-8995ef036a18#e09a
[info-android-semver]: https://github.com/semver/semver/issues/309
[info-android-versioncode]: https://medium.com/@maxirosson/versioning-android-apps-d6ec171cfd82
[info-semver]: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/257c8bc48a08620b77088af209ff3f4153221784/types/semver/index.d.ts#L152-L171
[repo-issue-increments]: https://github.com/byCedric/semantic-release-expo/issues/4#issuecomment-417583573

--- ---

<p align="center">
    with :heart: byCedric & <a href="https://github.com/byCedric/semantic-release-expo/graphs/contributors">Contributors</a>
</p>
