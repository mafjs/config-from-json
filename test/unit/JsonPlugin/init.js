var t = require('tap');
var proxyquire = require('proxyquire');

var srcPath = '../../../package';

t.test('init', function (t) {

    t.test('should set options', function (t) {
        var Plugin = proxyquire(srcPath + '/JsonPlugin', {});

        var plugin = new Plugin();

        plugin.init({a: 1, b: 2});

        t.same(plugin._options, {a: 1, b: 2});

        t.end();
    });

    t.end();
});
