# usage planning


```js
var Config = require('maf-config');


var config = new Config();

config
    .use(require('maf-config-from-json'))
    .receive()
    .then(() => {
        config.get('type');
    })
    .catch((error) => {
        
    });



```
