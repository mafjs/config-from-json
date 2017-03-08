var t = require('tap');
var proxyquire = require('proxyquire');

var srcPath = '../../../../package';

var JsonPluginError = require(srcPath + '/Error');


t.test('read', function (t) {

    t.test('should call fs.readFile', function (t) {
        var validSourcePath = '/etc/test.json';

        var read = proxyquire(srcPath + '/methods/read', {
            fs: {
                readFile: function () {
                    t.end();
                }
            }
        });

        read(validSourcePath);
    });

    t.test('should return Promise', function (t) {

        var validSourcePath = '/etc/some/path/test.json';

        var read = proxyquire(srcPath + '/methods/read', {
            fs: {
                readFile: function (filepath, callback) {
                    callback(null, '{"a": "a", "b": "b"}');
                }
            }
        });

        var promise = read(validSourcePath);

        t.type(promise.then, 'function');
        t.type(promise.catch, 'function');

        t.end();

    });

    t.test('should resolve promise, if fs.readFile return data', function (t) {

        var validSourcePath = '/etc/some/path/test.json';

        var read = proxyquire(srcPath + '/methods/read', {
            fs: {
                readFile: function (filepath, callback) {
                    t.equal(filepath, validSourcePath);
                    callback(null, '{"a": "a", "b": "b"}');
                }
            }
        });

        read(validSourcePath)
            .then(function (data) {
                t.equal(data, '{"a": "a", "b": "b"}');
                t.end();
            })
            .catch(function (error) {
                t.threw(error);
            });

    });

    t.test('should reject promise if fs.readFile return error', function (t) {

        var validSourcePath = '/etc/some/path/test.json';

        var read = proxyquire(srcPath + '/methods/read', {
            fs: {
                readFile: function (sourcepath, callback) {
                    t.equal(sourcepath, validSourcePath);
                    callback(new Error('test'));
                }
            }
        });

        read(validSourcePath)
            .then(function () {
                t.threw('should reject this promise');
            })
            .catch(function (error) {
                t.ok(error instanceof JsonPluginError);
                t.equal(error.code, JsonPluginError.CODES.CANT_READ_SOURCE);
                t.end();
            });

    });

    t.end();
});
