var riot = require('riot');
var rukus = require('rukus');
var feryt = require('feryt');

describe('greeter component', function() {

    // Mock RukusApp required by components
    var RukusApp = { version : '1.0.0' };
    var f = feryt(rukus.testComponent(riot, __dirname, RukusApp));

    it('should render the correct version from the context', function(done) {
        f.findOne('.greeting')
         .content(' Welcome to Your New Rukus APP 1.0.0 ');
        done();
    });

    it('should render the timer', function(done) {
        f.findOne('.time')
         .content(" You've been here for 0 seconds :) ");
        done();
    });
});

