var t = require('tap');
var proxyquire = require('proxyquire');

var srcPath = '../../../../package';

var JsonPluginError = require(srcPath + '/Error');

t.test('exists', function (t) {

    t.test('should call fs.existsSync', function (t) {

        var validSourcePath = '/etc/some/path/test.json';

        var exists = proxyquire(srcPath + '/methods/exists', {
            fs: {
                existsSync: function (sourcepath) {
                    t.equal(sourcepath, validSourcePath);
                    t.end();
                }
            }
        });

        exists(validSourcePath);

    });

    t.test('should return promise', function (t) {

        var validSourcePath = '/etc/some/path/test.json';

        var exists = proxyquire(srcPath + '/methods/exists', {
            fs: {
                existsSync: function () {
                    return true;
                }
            }
        });

        var promise = exists(validSourcePath);

        t.type(promise.then, 'function');
        t.type(promise.catch, 'function');

        t.end();

    });

    t.test('should resolve promise if existsSync return true', function (t) {

        var validSourcePath = '/etc/some/path/test.json';

        var exists = proxyquire(srcPath + '/methods/exists', {
            fs: {
                existsSync: function () {
                    return true;
                }
            }
        });

        exists(validSourcePath)
            .then(function () {
                t.end();
            })
            .catch(function (error) {
                t.threw(error);
            });

    });


    t.test('should reject promise if existsSync return false', function (t) {

        var validSourcePath = '/etc/some/path/test.json';

        var exists = proxyquire(srcPath + '/methods/exists', {
            fs: {
                existsSync: function () {
                    return false;
                }
            }
        });

        exists(validSourcePath)
            .then(function () {
                t.threw('should reject this promise');
            })
            .catch(function (error) {
                t.ok(error instanceof JsonPluginError);
                t.equal(error.code, JsonPluginError.CODES.NOT_EXISTS);
                t.end();
            });

    });

    t.end();
});
