
var RukusApp = {
    /*                  __________________________________________
     *                .'                                          '.
     * <(=^ ◡ ^=)> __ |  Your stuff goes here!                     |
     *                |                                            |
     *                |  RukusApp is passed into your components   |
     *                |  and provides a great location to set up   |                             |
     *                |  things like stores, APIs, routers and     |
     *                |  anything else that needs to be            |
     *                |  accessible from your component functions. |
     *                |                                            |
     *                '.__________________________________________.'
     */

};

riot.observable(RukusApp); 

/* <(=^ ◡ ^=)> .o ( Hey look! )
 *
 * I just made your RukusApp a riot.observable, you can use it as a global
 * event object for high level application events, or you can delete this
 * line all together and do something else :)
 */


// Mount Everything! (you can change this bit too)
// take a look at http://riotjs.com/guide/ for more information
riot.mount('*', RukusApp);


