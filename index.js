#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var yargs = require('yargs');
var skeletron = require('skeletron');
var initPkg = require('init-package-json');
var npmInstallPackage = require('npm-install-package');


if (require.main === module) {
    CLI();
}

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


function CLI() {

    switch(yargs.argv._[0]) {
        // rukus init
        case "newproject":
            newproject();
            break;
        // rukus component
        case "newcomponent":
            newcomponent();
            break;
        // rukus test
        case "test":
            test();
            break;
        // rukus devserver -p 4000
        case "devserver":
            devserver();
            break;
        default:
            console.log('usage: rukus <command> (newproject, newcomponent)');
            console.log(process.cwd(), __dirname);
    }
}

function newcomponent() {
    var here = process.cwd();
    var name = yargs.argv._[1];
    if(!name) {
        console.log('rukus newcomponent <name>');
        process.exit(1);
    }
    var base = path.resolve(here, name);

    if(fs.existsSync(base)) {
        console.log(base, 'already exists');
        process.exit(1);
    }
    skeletron({
        skel: path.resolve(__dirname, 'component-skel'),
        dest: base,
        data: { name : name },
        mode: '0777',
        followLinks: true
    }, function(finder) {
        finder.on('end', function () {
            process.exit(0);
        });
    });
}

function newproject() {
    var here = process.cwd();
    var name = yargs.argv._[1];
    if(!name) {
        console.log('rukus newproject <name>');
        process.exit(1);
    }
    var base = path.resolve(here, name);

    if(fs.existsSync(base)) {
        console.log(base, 'already exists');
        process.exit(1);
    }
    skeletron({
        skel: path.resolve(__dirname, 'project-skel'),
        dest: base,
        data: { name : name },
        mode: '0777',
        followLinks: true
    }, function(finder) {
        finder.on('end', function () {
            process.chdir(base);
            var deps = ['webpack', 'riot', 'mocha', 'babel-loader', 'rukus-loader'];
            npmInstallPackage(deps, {save:true}, function(err) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                console.log('done! now npm install -i webpack and run it :)');
            });
        });
    });

}
