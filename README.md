# Expo - Semantic Release

[![Latest Release](https://img.shields.io/github/release/byCedric/semantic-release-expo/all.svg?style=flat-square)](https://github.com/byCedric/semantic-release-expo/releases)
[![Build Status](https://img.shields.io/travis/byCedric/semantic-release-expo/master.svg?style=flat-square)](https://travis-ci.com/byCedric/semantic-release-expo)
[![Codecov coverage](https://img.shields.io/codecov/c/github/byCedric/semantic-release-expo.svg?style=flat-square)](https://codecov.io/gh/byCedric/semantic-release-expo)
[![Code Climate grade](https://img.shields.io/codeclimate/maintainability/byCedric/semantic-release-expo.svg?style=flat-square)](https://codeclimate.com/github/byCedric/semantic-release-expo)

An [Expo][expo] implementation for [semantic release][semantic-release] so you don't have to bother.

![Example](docs/terminal.svg)

## How it works

Semantic release will first determine a new version based on your likings. 
Then this plugin will search for your [Expo manifest][expo-manifest] and update it accordingly. 
Not only will this update the [`version`][expo-version] property within the manifest. 
It will also increment the [Android `versionCode`][expo-version-android] or set the version to the [iOS `buildNumber`][expo-version-ios].

## Verify Conditions

Before such a smooth, carefree release can take place, the plugin must validate the existence of a manifest. 
This check takes place in the [verify condition][semantic-release-steps] step of semantic release.
The name of the Expo app, defined in the [`name` property][expo-name], is dumped to console to provide some feedback for successful validation.

## Prepare

This plugin writes the actual changes to the manifest during preparation.
After this step, you can [publish to Expo][expo-publish], [create a new build][expo-build] or add the changes in a [release commit][semantic-release-commit].
The [`version` property][expo-version] within the manifest is always updated. 
For Android, the previous `versionCode` is incremented by one. 
And for iOS, the new version is set as `buildNumber`. 
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
    "publish": [
        {
            "path": "@semantic-release/exec",
            "cmd": "echo \"done!\""
        }
    ],
    "success": false,
    "fail": false
}
```

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
