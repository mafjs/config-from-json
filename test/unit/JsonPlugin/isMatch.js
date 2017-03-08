var t = require('tap');
var proxyquire = require('proxyquire');

var srcPath = '../../../package';

var JsonPluginError = require(srcPath + '/Error');

t.test('isMatch', function (t) {

    t.test('should match json filepath', function (t) {
        var Plugin = proxyquire(srcPath + '/JsonPlugin', {});

        var plugin = new Plugin();

        t.ok(plugin.isMatch('/etc/some/path/test.json'));
        t.end();
    });

    t.test('should not match not json', function (t) {
        var Plugin = proxyquire(srcPath + '/JsonPlugin', {});

        var plugin = new Plugin();

        t.notOk(plugin.isMatch('/etc/some/path/test.yml'));
        t.notOk(plugin.isMatch('/etc/some/path/test.toml'));
        t.notOk(plugin.isMatch('/etc/some/path/test.js'));
        t.end();
    });

    t.end();
});
