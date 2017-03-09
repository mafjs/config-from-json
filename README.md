# maf-config-from-json

[maf-config](https://github.com/mafjs/config) plugin for node.js, get config from json files


[![bitHound Overall Score](https://www.bithound.io/github/mafjs/config-from-json/badges/score.svg)](https://www.bithound.io/github/mafjs/config-from-json)
[![bitHound Dependencies](https://www.bithound.io/github/mafjs/config-from-json/badges/dependencies.svg)](https://www.bithound.io/github/mafjs/config-from-json/master/dependencies/npm)
[![Build Status](https://travis-ci.org/mafjs/config.svg?branch=master)](https://travis-ci.org/mafjs/config)
[![Coverage Status](https://coveralls.io/repos/github/mafjs/config-from-json/badge.svg?branch=master)](https://coveralls.io/github/mafjs/config-from-json?branch=master)

[![NPM](https://nodei.co/npm/maf-config-from-json.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/maf-config-from-json/)


## install

```
npm install maf-config-from-json
```

## usage

```js
var Config = require('maf-config');

var jsonPlugin = require('maf-config-from-json');

var config = new Config();

config
    .use(jsonPlugin)
    .from('/configs/config.json', '.')
    .from('/configs/api.json', 'api')
    .from('/configs/db.json', 'db')
    .init()
    .then(() => {
        console.log(config.get('api.test')));
    })
    .catch((error) => {
        logger.error(error);
    });

```

# LICENSE

MIT
