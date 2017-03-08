var fs = require('fs');

var JsonPluginError = require('../Error');

module.exports = function (sourcepath) {
    return new Promise((resolve, reject) => {

        if (fs.existsSync(sourcepath) === false) {
            return reject(
                (new JsonPluginError(JsonPluginError.CODES.NOT_EXISTS))
                .bind({
                    sourcepath: sourcepath
                })
            );
        }

        resolve();
    });
};
