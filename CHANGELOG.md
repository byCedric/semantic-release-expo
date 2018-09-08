# [2.1.0](https://github.com/bycedric/semantic-release-expo/compare/2.0.0...2.1.0) (2018-09-08)


### Bug fixes

* exclude semantic release configuration from npm ([c7c212e](https://github.com/bycedric/semantic-release-expo/commit/c7c212e))


### New features

* add configurable version templates ([#36](https://github.com/bycedric/semantic-release-expo/issues/36)) ([5745c9d](https://github.com/bycedric/semantic-release-expo/commit/5745c9d))

# [2.0.0](https://github.com/bycedric/semantic-release-expo/compare/1.2.1...2.0.0) (2018-08-31)


### Bug fixes

* breaking changes behaviour with semantic release ([3844459](https://github.com/bycedric/semantic-release-expo/commit/3844459))
* disable spammy codecov messages in pull requests ([29225be](https://github.com/bycedric/semantic-release-expo/commit/29225be))


### Code refactors

* upgrade commit-types-peakfijn to version 0.6.0 ([#32](https://github.com/bycedric/semantic-release-expo/issues/32)) ([5065b48](https://github.com/bycedric/semantic-release-expo/commit/5065b48))
* upgrade conventional-changelog-peakfijn to version 0.6.0 ([#33](https://github.com/bycedric/semantic-release-expo/issues/33)) ([adcbc8c](https://github.com/bycedric/semantic-release-expo/commit/adcbc8c))
* upgrade cz-changelog-peakfijn to version 0.6.0 ([#34](https://github.com/bycedric/semantic-release-expo/issues/34)) ([fe462c6](https://github.com/bycedric/semantic-release-expo/commit/fe462c6))


### New features

* make android version deterministic ([#35](https://github.com/bycedric/semantic-release-expo/issues/35)) ([1428f1a](https://github.com/bycedric/semantic-release-expo/commit/1428f1a))


### BREAKING CHANGE

* android incremental build number is replaced. This now uses an integer value calculated by multiple variables.

https://medium.com/@maxirosson/versioning-android-apps-d6ec171cfd82

## [1.2.1](https://github.com/bycedric/semantic-release-expo/compare/1.2.0...1.2.1) (2018-08-04)


### Bug fixes

* set jsdom test url for local storage support ([#29](https://github.com/bycedric/semantic-release-expo/issues/29)) ([1d2e9b6](https://github.com/bycedric/semantic-release-expo/commit/1d2e9b6))


### Code refactors

* upgrade [@semantic-release](https://github.com/semantic-release)/changelog to version 3.0.0 ([#23](https://github.com/bycedric/semantic-release-expo/issues/23)) ([fa3396a](https://github.com/bycedric/semantic-release-expo/commit/fa3396a))
* upgrade commit-types-peakfijn to version 0.5.0 ([#24](https://github.com/bycedric/semantic-release-expo/issues/24)) ([4f63ab5](https://github.com/bycedric/semantic-release-expo/commit/4f63ab5))
* upgrade conventional-changelog-peakfijn to version 0.5.0 ([#25](https://github.com/bycedric/semantic-release-expo/issues/25)) ([be7929d](https://github.com/bycedric/semantic-release-expo/commit/be7929d))
* upgrade cz-changelog-peakfijn to version 0.5.0 ([#26](https://github.com/bycedric/semantic-release-expo/issues/26)) ([a9bd560](https://github.com/bycedric/semantic-release-expo/commit/a9bd560))
* upgrade fs-extra to version 7.0.0 ([#22](https://github.com/bycedric/semantic-release-expo/issues/22)) ([f5198d1](https://github.com/bycedric/semantic-release-expo/commit/f5198d1))
* upgrade ts-jest to version 23.1.2 ([#31](https://github.com/bycedric/semantic-release-expo/issues/31)) ([fb14ece](https://github.com/bycedric/semantic-release-expo/commit/fb14ece))
* use release commit type for automated releases ([af87788](https://github.com/bycedric/semantic-release-expo/commit/af87788))

# [1.2.0](https://github.com/bycedric/semantic-release-expo/compare/1.1.1...1.2.0) (2018-07-11)


### Code refactors

* increase usability and other minor changes ([#21](https://github.com/bycedric/semantic-release-expo/issues/21)) ([49e29b1](https://github.com/bycedric/semantic-release-expo/commit/49e29b1)), closes [#7](https://github.com/bycedric/semantic-release-expo/issues/7) [#7](https://github.com/bycedric/semantic-release-expo/issues/7)


### Code style changes

* remove extraneous space in log statement ([cdaa1b9](https://github.com/bycedric/semantic-release-expo/commit/cdaa1b9))


### New features

* inherit configuration from prepare when verifying ([#20](https://github.com/bycedric/semantic-release-expo/issues/20)) ([729baeb](https://github.com/bycedric/semantic-release-expo/commit/729baeb))

## [1.1.1](https://github.com/bycedric/semantic-release-expo/compare/1.1.0...1.1.1) (2018-07-10)


### Bug fixes

* add missing reason of failure in exception ([3f198ed](https://github.com/bycedric/semantic-release-expo/commit/3f198ed))
* log the manifest file throwing the exception ([05183f4](https://github.com/bycedric/semantic-release-expo/commit/05183f4))


### Code refactors

* upgrade [@types](https://github.com/types)/fs-extra to version 5.0.4 ([154afed](https://github.com/bycedric/semantic-release-expo/commit/154afed))
* upgrade ts-jest to version 23.0.0 ([d2e8d94](https://github.com/bycedric/semantic-release-expo/commit/d2e8d94))
* use `chore` as commit type for new releases ([3cb214f](https://github.com/bycedric/semantic-release-expo/commit/3cb214f))


### Documentation changes

* remove excessive prepare step from example ([958b01c](https://github.com/bycedric/semantic-release-expo/commit/958b01c))


### Other chores

* add commitizen with peakfijn conventions ([28e5552](https://github.com/bycedric/semantic-release-expo/commit/28e5552))
* configure greenkeeper to use proper commit messages ([9986e1c](https://github.com/bycedric/semantic-release-expo/commit/9986e1c))
* rebuild changelog using peakfijn conventions ([3133aa5](https://github.com/bycedric/semantic-release-expo/commit/3133aa5))
* update semantic release config with the peakfijn conventions ([e7f80b9](https://github.com/bycedric/semantic-release-expo/commit/e7f80b9))


### Pipeline changes

* add commitlint with peakfijn conventions ([2e94a50](https://github.com/bycedric/semantic-release-expo/commit/2e94a50))
* use new single analyser format for releases ([7e46655](https://github.com/bycedric/semantic-release-expo/commit/7e46655))

# [1.1.0](https://github.com/bycedric/semantic-release-expo/compare/1.0.4...1.1.0) (2018-06-18)


### New features

* add support for multiple manifests ([b8103d4](https://github.com/bycedric/semantic-release-expo/commit/b8103d4)), closes [#12](https://github.com/bycedric/semantic-release-expo/issues/12)
* use git flow approach to releases ([4546556](https://github.com/bycedric/semantic-release-expo/commit/4546556))


### Other chores

* upgrade `jest` dependency to `jest@^23.1.0` ([08268ea](https://github.com/bycedric/semantic-release-expo/commit/08268ea))



## [1.0.4](https://github.com/bycedric/semantic-release-expo/compare/1.0.3...1.0.4) (2018-06-17)


### Bug fixes

* pin [@types](https://github.com/types)/fs-extra to 5.0.2 ([#10](https://github.com/bycedric/semantic-release-expo/issues/10)) ([6b34f57](https://github.com/bycedric/semantic-release-expo/commit/6b34f57))


### Code refactors

* remove unused `Config` type ([63fbb2c](https://github.com/bycedric/semantic-release-expo/commit/63fbb2c))


### Code style changes

* reindent package file with tabs ([f1e4333](https://github.com/bycedric/semantic-release-expo/commit/f1e4333))


### Other chores

* add terminal cast as example ([788092e](https://github.com/bycedric/semantic-release-expo/commit/788092e))
* update [@types](https://github.com/types)/jest to version 23.0.0 ([c00f165](https://github.com/bycedric/semantic-release-expo/commit/c00f165))



## [1.0.3](https://github.com/bycedric/semantic-release-expo/compare/1.0.2...1.0.3) (2018-05-20)


### Bug fixes

* detect indentation and new lines to keep style intact ([94379c9](https://github.com/bycedric/semantic-release-expo/commit/94379c9))


### Testing updates

* add extra validation for new line detection ([60b4a67](https://github.com/bycedric/semantic-release-expo/commit/60b4a67))



## [1.0.2](https://github.com/bycedric/semantic-release-expo/compare/1.0.1...1.0.2) (2018-05-20)


### Bug fixes

* add changelog plugin for semantic releases ([586047e](https://github.com/bycedric/semantic-release-expo/commit/586047e))



## [1.0.1](https://github.com/bycedric/semantic-release-expo/compare/1.0.0...1.0.1) (2018-05-20)


### Bug fixes

* remove chore from triggering new version ([06b8a5e](https://github.com/bycedric/semantic-release-expo/commit/06b8a5e))



# [1.0.0](https://github.com/bycedric/semantic-release-expo/compare/63891a6...1.0.0) (2018-05-20)


### Bug fixes

* add semantic release and proper branch name ([eb3aa6c](https://github.com/bycedric/semantic-release-expo/commit/eb3aa6c))
* use proper casing in badges in readme ([1adea31](https://github.com/bycedric/semantic-release-expo/commit/1adea31))


### New features

* add first draft of expo releases ([67c0f6f](https://github.com/bycedric/semantic-release-expo/commit/67c0f6f))
* integrate semantic release in travis ([cbe0582](https://github.com/bycedric/semantic-release-expo/commit/cbe0582))


### Other chores

* initial project structure setup ([63891a6](https://github.com/bycedric/semantic-release-expo/commit/63891a6))
