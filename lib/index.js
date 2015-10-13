#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

module.exports.loadComponent = function(riot, location, component) {
    var comp = module.exports.findComponents([location])[0];
    riot.tag(component, fs.readFileSync(path.resolve(comp, 'index.html')), 
             require(path.resolve(comp, 'index.js')));
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

        if(files.indexOf('test.js') == -1) {
            loader.emitWarning("component at "+location+" missing a test.js file.");
        }
        var js = path.resolve(location, 'index.js');
        var template = path.resolve(location, 'index.html');
        loader.addDependency(js);
        loader.addDependency(template);
        return "riot.tag('"+componentName+"', `"+fs.readFileSync(template)+"`, require('"+js+"'));";
};

