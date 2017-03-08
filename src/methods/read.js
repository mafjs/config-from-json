var fs = require('fs');

var JsonPluginError = require('../Error');

module.exports = function (sourcepath) {
    return new Promise((resolve, reject) => {

        fs.readFile(sourcepath, function (error, data) {

            if (error) {

                return reject(
                    JsonPluginError.createError(JsonPluginError.CODES.CANT_READ_SOURCE, error)
                        .bind({
                            sourcepath: sourcepath
                        })
                );

            }

            resolve(data);
        });

    });
};
