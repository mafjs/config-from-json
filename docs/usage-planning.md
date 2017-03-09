# usage planning


```js
var Config = require('maf-config');


var config = new Config();

config
    .use(require('maf-config-from-json'))
    .init()
    .then(() => {
        config.get('some.config.param');
    })
    .catch((error) => {
        //
    });

```
