var t = require('tap');
var proxyquire = require('proxyquire');

var srcPath = '../../../package';

var JsonPluginError = require(srcPath + '/Error');

t.test('read', function (t) {

    t.test('should call exists, read and parse', function (t) {
        var Plugin = proxyquire(srcPath + '/JsonPlugin', {
            './methods/exists': function () {

                return new Promise(function (resolve, reject) {
                    resolve();
                });

            },
            './methods/read': function () {

                return new Promise(function (resolve, reject) {
                    resolve();
                });

            },
            './methods/parse': function () {

                return new Promise(function (resolve, reject) {
                    resolve({a: 1, b: 2});
                });

            }
        });

        var plugin = new Plugin();

        plugin.read()
            .then(function (obj) {
                t.same(obj, {a: 1, b: 2});
                t.end();
            })
            .catch(t.threw);
    });

    t.test('should reject if exists rejects', function (t) {
        var Plugin = proxyquire(srcPath + '/JsonPlugin', {
            './methods/exists': function () {

                return new Promise(function (resolve, reject) {
                    reject(new JsonPluginError(JsonPluginError.CODES.NOT_EXISTS));
                });

            },
            './methods/read': function () {

                return new Promise(function (resolve, reject) {
                    resolve();
                });

            },
            './methods/parse': function () {

                return new Promise(function (resolve, reject) {
                    resolve({a: 1, b: 2});
                });

            }
        });

        var plugin = new Plugin();

        plugin.read()
            .then(function () {
                t.threw(new Error('should reject Error'));
            })
            .catch(function (error) {
                t.ok(error instanceof JsonPluginError);
                t.equal(error.code, JsonPluginError.CODES.NOT_EXISTS);
                t.end();
            });
    });

    t.test('should reject if read rejects', function (t) {
        var Plugin = proxyquire(srcPath + '/JsonPlugin', {
            './methods/exists': function () {

                return new Promise(function (resolve, reject) {
                    resolve();
                });

            },
            './methods/read': function () {

                return new Promise(function (resolve, reject) {
                    reject(new JsonPluginError(JsonPluginError.CODES.CANT_READ_SOURCE));
                });

            },
            './methods/parse': function () {

                return new Promise(function (resolve, reject) {
                    resolve({a: 1, b: 2});
                });

            }
        });

        var plugin = new Plugin();

        plugin.read()
            .then(function () {
                t.threw(new Error('should reject Error'));
            })
            .catch(function (error) {
                t.ok(error instanceof JsonPluginError);
                t.equal(error.code, JsonPluginError.CODES.CANT_READ_SOURCE);
                t.end();
            });
    });

    t.test('should reject if parse rejects', function (t) {
        var Plugin = proxyquire(srcPath + '/JsonPlugin', {
            './methods/exists': function () {

                return new Promise(function (resolve, reject) {
                    resolve();
                });

            },
            './methods/read': function () {

                return new Promise(function (resolve, reject) {
                    resolve();
                });

            },
            './methods/parse': function () {

                return new Promise(function (resolve, reject) {
                    reject(new JsonPluginError(JsonPluginError.CODES.INVALID_JSON));
                });

            }
        });

        var plugin = new Plugin();

        plugin.read()
            .then(function () {
                t.threw(new Error('should reject Error'));
            })
            .catch(function (error) {
                t.ok(error instanceof JsonPluginError);
                t.equal(error.code, JsonPluginError.CODES.INVALID_JSON);
                t.end();
            });
    });

    t.end();

});
