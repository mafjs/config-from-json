var t = require('tap');
var proxyquire = require('proxyquire');

var srcPath = '../../../package';

var JsonPluginError = require(srcPath + '/Error');


t.test('constructor', function (t) {

    t.test('should create instance', function (t) {
        var Plugin = proxyquire(srcPath + '/JsonPlugin', {});

        var plugin = new Plugin();

        t.equal(plugin.type, 'receive');
        t.equal(plugin.name, 'maf-config-from-json');
        t.same(plugin.Error, JsonPluginError);

        t.end();
    });

    t.test('should create instance with logger passed', function (t) {
        var Plugin = proxyquire(srcPath + '/JsonPlugin', {});

        var logger = {debug: function () {}};

        var plugin = new Plugin(logger);

        t.equal(plugin.type, 'receive');
        t.equal(plugin.name, 'maf-config-from-json');
        t.same(plugin.Error, JsonPluginError);

        t.end();
    });

    t.test('should throw error if logger without debug method', function (t) {
        var Plugin = proxyquire(srcPath + '/JsonPlugin', {});

        var logger = {};

        try {
            new Plugin(logger);
        } catch (error) {
            t.ok(error instanceof JsonPluginError);
            t.equal(error.code, JsonPluginError.CODES.INVALID_LOGGER);
            t.end();
        }

    });

    t.end();

});
