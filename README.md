# Glob pattern for semver

**TL;DR**: here is the glob pattern: `@(0|[1-9]*([0-9])).@(0|[1-9]*([0-9])).@(0|[1-9]*([0-9]))?(-@(*([a-zA-Z0-9-])@(-|[a-zA-Z])*([a-zA-Z0-9-])|@(0|[1-9]*([0-9])))*(.@(*([a-zA-Z0-9-])@(-|[a-zA-Z])*([a-zA-Z0-9-])|@(0|[1-9]*([0-9])))))?(++([a-zA-Z0-9-])*(.+([a-zA-Z0-9-])))`

This project aims to detect precisely versions following [semver 2.0](https://semver.org/). The generation code is based on [Backusnaur form grammar](https://semver.org/#backusnaur-form-grammar-for-valid-semver-versions) defined in semver 2.0.

A complete test can be found at [Glob Tool](https://www.digitalocean.com/community/tools/glob?comments=true&glob=%40%280%7C%5B1-9%5D%2A%28%5B0-9%5D%29%29.%40%280%7C%5B1-9%5D%2A%28%5B0-9%5D%29%29.%40%280%7C%5B1-9%5D%2A%28%5B0-9%5D%29%29%3F%28-%40%28%2A%28%5Ba-zA-Z0-9-%5D%29%40%28-%7C%5Ba-zA-Z%5D%29%2A%28%5Ba-zA-Z0-9-%5D%29%7C%40%280%7C%5B1-9%5D%2A%28%5B0-9%5D%29%29%29%2A%28.%40%28%2A%28%5Ba-zA-Z0-9-%5D%29%40%28-%7C%5Ba-zA-Z%5D%29%2A%28%5Ba-zA-Z0-9-%5D%29%7C%40%280%7C%5B1-9%5D%2A%28%5B0-9%5D%29%29%29%29%29%3F%28%2B%40%28%2A%28%5Ba-zA-Z0-9-%5D%29%40%28-%7C%5Ba-zA-Z%5D%29%2A%28%5Ba-zA-Z0-9-%5D%29%7C%2B%28%5B0-9%5D%29%29%2A%28.%40%28%2A%28%5Ba-zA-Z0-9-%5D%29%40%28-%7C%5Ba-zA-Z%5D%29%2A%28%5Ba-zA-Z0-9-%5D%29%7C%2B%28%5B0-9%5D%29%29%29%29&matches=false&tests=%2F%2F%20Valid%20Semantic%20Versions&tests=0.0.4&tests=1.2.3&tests=10.20.30&tests=1.1.2-prerelease%2Bmeta&tests=1.1.2%2Bmeta&tests=1.1.2%2Bmeta-valid&tests=1.0.0-alpha&tests=1.0.0-beta&tests=1.0.0-alpha.beta&tests=1.0.0-alpha.beta.1&tests=1.0.0-alpha.1&tests=1.0.0-alpha0.valid&tests=1.0.0-alpha.0valid&tests=1.0.0-alpha-a.b-c-somethinglong%2Bbuild.1-aef.1-its-okay&tests=1.0.0-rc.1%2Bbuild.1&tests=2.0.0-rc.1%2Bbuild.123&tests=1.2.3-beta&tests=10.2.3-DEV-SNAPSHOT&tests=1.2.3-SNAPSHOT-123&tests=1.0.0&tests=2.0.0&tests=1.1.7&tests=2.0.0%2Bbuild.1848&tests=2.0.1-alpha.1227&tests=1.0.0-alpha%2Bbeta&tests=1.2.3----RC-SNAPSHOT.12.9.1--.12%2B788&tests=1.2.3----R-S.12.9.1--.12%2Bmeta&tests=1.2.3----RC-SNAPSHOT.12.9.1--.12&tests=1.0.0%2B0.build.1-rc.10000aaa-kk-0.1&tests=99999999999999999999999.999999999999999999.99999999999999999&tests=1.0.0-0A.is.legal&tests=%2F%2F%20Invalid%20Semantic%20Versions%0D&tests=1&tests=1.2&tests=1.2.3-0123&tests=1.2.3-0123.0123&tests=1.1.2%2B.123&tests=%2Binvalid&tests=-invalid&tests=-invalid%2Binvalid&tests=-invalid.01&tests=alpha&tests=alpha.beta&tests=alpha.beta.1&tests=alpha.1&tests=alpha%2Bbeta&tests=alpha_beta&tests=alpha.&tests=alpha..&tests=beta&tests=1.0.0-alpha_beta&tests=-alpha.&tests=1.0.0-alpha..&tests=1.0.0-alpha..1&tests=1.0.0-alpha...1&tests=1.0.0-alpha....1&tests=1.0.0-alpha.....1&tests=1.0.0-alpha......1&tests=1.0.0-alpha.......1&tests=01.1.1&tests=1.01.1&tests=1.1.01&tests=1.2&tests=1.2.3.DEV&tests=1.2-SNAPSHOT&tests=1.2.31.2.3----RC-SNAPSHOT.12.09.1--..12%2B788&tests=1.2-RC-SNAPSHOT&tests=-1.0.3-gamma%2Bb7718&tests=%2Bjustmeta&tests=9.8.7%2Bmeta%2Bmeta&tests=9.8.7-whatever%2Bmeta%2Bmeta&tests=99999999999999999999999.999999999999999999.99999999999999999----RC-SNAPSHOT.12.09.1--------------------------------..12), an online glob testing utility.

## Getting Started

In order to test locally, run the following commands:
```bash
npm install
npm generate
```

Feel free to improve the generation, as the glob pattern currently is *232 characters* long.
