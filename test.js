const semver = require("semver");


function show(asv) 
{
//    const sv = semver.coerce(asv, {includePrerelease: true})
    const sv = new semver.SemVer(asv, {includePrerelease: true});

    console.log(
        "semver(%s). typeof %s, includePrerelease: %s, loose: %s, version: %s, raw: %s, prerelease.length: %d",
        asv,
        typeof sv,
        sv.options.includePrerelease,
        sv.options.loose,
        sv.version,
        sv.raw,
        sv.prerelease.length
    );
}

show("1.0.1-alpha.27");
// show("1.0.0-alpha.27");
// show("1.0.0-alpha.27");