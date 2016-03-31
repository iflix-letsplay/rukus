var fs = require('fs');
var path = require('path');
var jsdom = require('jsdom');

module.exports.testComponent = function(riot, dir, RukusApp) {
    /* testComponent returns a jsdom document with the rendered component */
    var name = path.basename(dir);
    var html = fs.readFileSync(path.resolve(dir, 'index.html')).toString();
    var js = require(path.resolve(dir, 'index.js'));
    // create a global window object with jsdom and a global RukusApp
    global.RukusApp = RukusApp || {};
    global.window = jsdom.jsdom(html).defaultView;
    riot.tag(name, html, js);
    return jsdom.jsdom(riot.render(name));
};

module.exports.findComponents = function(dirs, componentName) {
    var components = [];

    function walk(dir) {
        // walk a directory tree adding any component paths to components
        if(isComponent(dir)) {
            if(!componentName || (componentName && path.basename(dir) == componentName)) {
                components.push(dir);
            }
        } else {
            fs.readdirSync(dir).forEach(function(f) {
                var p = path.resolve(dir, f);
                if(fs.statSync(p).isDirectory()) {
                    walk(p);
                }
            });
        }
    }

    function isComponent(filePath) {
        var files = fs.readdirSync(filePath);
        return (~files.indexOf('index.js') && ~files.indexOf('index.html'));
    }

    dirs.map(walk);
    return components;
};


module.exports.riotifyComponent = function(loader, location) {
        var files = fs.readdirSync(location);
        var componentName = path.basename(location);

        if(files.indexOf('index.js') == -1) {
            loader.emitError("component at "+location+" requires an index.js file.");
        }

        if(files.indexOf('index.html') == -1) {
            loader.emitError("component at "+location+" requires an index.html file.");
        }

        var js = path.resolve(location, 'index.js');
        var template = path.resolve(location, 'index.html');
        loader.addDependency(js);
        loader.addDependency(template);
        return "riot.tag('"+componentName+"', `"+fs.readFileSync(template)+"`, require('"+js+"'));";
};

