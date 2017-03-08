var fs = require('fs');

var JsonPluginError = require('./Error');

class FromJsonPlugin {

    /**
     * @param {?Logger} logger
     */
    constructor (logger) {
        this.type = 'receive';
        this.name = 'maf-config-from-json';

        this.Error = JsonPluginError;
        this._logger = this._validateLogger(logger);

        this._options = {};
    }

    /**
     * init
     * @param {Object} options
     */
    init (options) {
        this._options = options;
    }

    /**
     * @param {String} sourcepath
     * @return {Boolean}
     */
    isMatch (sourcepath) {
        return /\.json$/.test(sourcepath);
    }

    /**
     * read json file
     *
     * @param {String} sourcepath
     * @return {Promise}
     */
    read (sourcepath) {

        return new Promise((resolve, reject) => {

            this._exists(sourcepath)
                .then(() => {
                    return this._read(sourcepath);
                })
                .then((data) => {
                    return this._parse(sourcepath, data);
                })
                .then((obj) => {
                    resolve(obj);
                })
                .catch((error) => {
                    reject(error);
                });

        });

    }

    /**
     * check file exists
     *
     * @private
     * @param {String} sourcepath
     * @return {Promise}
     */
    _exists (sourcepath) {

        return new Promise((resolve, reject) => {

            if (fs.existsSync(sourcepath) === false) {
                return reject(
                    this._createError(JsonPluginError.CODES.NOT_EXISTS)
                        .bind({
                            sourcepath: sourcepath
                        })
                );
            }

            resolve();
        });

    }

    /**
     * read file
     *
     * @private
     * @param {String} sourcepath
     * @return {Promise}
     */
    _read (sourcepath) {

        return new Promise((resolve, reject) => {

            fs.readFile(sourcepath, function (error, data) {

                if (error) {
                    return reject(
                        this._createError(JsonPluginError.CODES.CANT_READ_SOURCE)
                            .bind({
                                sourcepath: sourcepath
                            })
                    );
                }

                resolve(data);
            });

        });

    }

    /**
     * parse file data
     *
     * @private
     * @param {String} sourcepath
     * @param {String} data
     * @return {Promise}
     */
    _parse (sourcepath, data) {

        return new Promise((resolve, reject) => {
            try {
                var json = JSON.parse(data);
                resolve(json);
            } catch (error) {
                return reject(
                    this._createError(JsonPluginError.CODES.INVALID_JSON)
                        .bind({
                            sourcepath: sourcepath
                        })
                );
            }
        });

    }

    /**
     * @private
     * @param {String} code
     * @param {Error} error
     * @return {JsonPluginError}
     */
    _createError (code, error) {
        return this.Error.createError(code, error);
    }

    /**
     * validate logger
     *
     * @private
     * @param {?Logger} logger
     * @return {Logger|Null}
     */
    _validateLogger (logger) {
        if (!logger) {
            return null;
        }

        if (typeof logger.debug !== 'function') {
            throw this._createError(JsonPluginError.CODES.INVALID_LOGGER);
        }

        return logger;
    }

    /* istanbul ignore next */
    /**
     * @private
     */
    _debug () {
        if (
            this._logger &&
            this._logger.debug &&
            typeof this._logger.debug === 'function'
        ) {
            this._logger.debug.apply(this._logger, arguments);
        }
    }
}

module.exports = FromJsonPlugin;
