var JsonPluginError = require('../Error');

module.exports = function (sourcepath, data) {

    return new Promise((resolve, reject) => {
        try {
            var json = JSON.parse(data);

            resolve(json);

        } catch (error) {

            return reject(
                JsonPluginError.createError(JsonPluginError.CODES.INVALID_JSON, error)
                    .bind({
                        sourcepath: sourcepath
                    })
            );

        }
    });

};
