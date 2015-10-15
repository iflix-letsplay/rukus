var riot = require('riot');
var rukus = require('rukus');
var feryt = require('feryt');

describe('{{name}} component', function() {

    var RukusApp = {};
    var f = feryt(rukus.testComponent(riot, __dirname, RukusApp));

    it('should render the message', function(done) {
        f.findOne('div')
         .content(' add your component logic here ');
        done();
    });
});

