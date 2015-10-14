#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var yargs = require('yargs');
var skeletron = require('skeletron');
var npmInstallPackage = require('npm-install-package');


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
        skel: path.resolve(__dirname, '..', 'component-skel'),
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
        skel: path.resolve(__dirname, '..', 'project-skel'),
        dest: base,
        data: { name : name },
        mode: '0777',
        followLinks: true
    }, function(finder) {
        finder.on('end', function () {
            process.chdir(base);
            console.log('installing deps..');
            var deps = ['webpack', 'riot', 'babel-loader', 'file-loader'];//, 'rukus-loader'];
            var devDeps = ['webpack-dev-server', 'mocha'];
            npmInstallPackage(deps, {save:true}, function(err) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                npmInstallPackage(devDeps, {saveDev:true}, function(err) {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }
                    console.log('done! now cd into your project and run npm start');
                });
            });
        });
    });

}
