var Config = require('maf-config');

var jsonPlugin = require('../package/JsonPlugin');

var logger = require('log4js-nested').getLogger();

var config = new Config(logger);

config
    .use(jsonPlugin)
    .from(__dirname + '/configs/config.json', '.')
    .from(__dirname + '/configs/api.json', 'api')
    .from(__dirname + '/configs/db.json', 'db')
    .init()
    .then(() => {
        logger.info(config.isValid());
        logger.info(config.get('api.test'));
    })
    .catch((error) => {
        logger.error(error);
    });
