
module.exports = function(opts)  {
    this.message = `Welcome to Your New Rukus APP ${opts.version}`;
    this.seconds = 0;
    window.setInterval(() => { this.seconds++; this.update();}, 1000);
};
