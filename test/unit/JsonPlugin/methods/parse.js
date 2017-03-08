var t = require('tap');
var proxyquire = require('proxyquire');

var srcPath = '../../../../package';

var JsonPluginError = require(srcPath + '/Error');


t.test('parse', function (t) {

    t.test('should return Promise', function (t) {

        var parse = proxyquire(srcPath + '/methods/parse', {});

        var validSourcePath = '/etc/test.json';

        var data = '{"a": 1, "b": 2}';

        var promise = parse(validSourcePath, data);

        t.type(promise.then, 'function');
        t.type(promise.catch, 'function');
        t.end();

    });


    t.test('should resolve parsed data on valid json', function (t) {
        var parse = proxyquire(srcPath + '/methods/parse', {});

        var validSourcePath = '/etc/test.json';

        var data = '{"a": 1, "b": 2}';

        parse(validSourcePath, data)
            .then(function (json) {
                t.same(json, {a: 1, b: 2});
                t.end();
            })
            .catch(t.threw);
    });

    t.test('should reject promise if json invalid', function (t) {
        var parse = proxyquire(srcPath + '/methods/parse', {});

        var validSourcePath = '/etc/test.json';

        var data = '{"a": 1, "b": 2';

        parse(validSourcePath, data)
            .then(function () {
                t.threw(new Error('should reject promise'));
            })
            .catch(function (error) {
                t.ok(error instanceof JsonPluginError);
                t.equal(error.code, JsonPluginError.CODES.INVALID_JSON);
                t.end();
            });
    });


    t.end();
});
