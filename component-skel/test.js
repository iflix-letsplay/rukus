var riot = require('riot');
var rukus = require('rukus');
var feryt = require('feryt');

describe('{{name}} component', function() {

    // context represents 'opts' passed into your component handler
    var context = {};
    var f = feryt(rukus.testComponent(riot, __dirname, context));

    it('should render the message', function(done) {
        f.findOne('div')
         .content(' add your component logic here ');
        done();
    });
});

