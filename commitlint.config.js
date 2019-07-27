module.exports = {
	extends: [
		'@peakfijn/config-commitlint',
	],
	ignores: [
		// fix: ignore dependency updates by dependabot
		commit => commit.startsWith('chore(deps):'),
		commit => commit.startsWith('chore(deps-dev):'),
	],
};
