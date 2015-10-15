/*                  __________________________________________
 *                .'                                          '.
 * <(=^ ◡ ^=)> __ |  Your stuff goes here!                     |
 *                |                                            |
 *                |  RukusApp is accessible in your components |
 *                |  and provides a great location to set up   |
 *                |  things like stores, APIs, routers and     |
 *                |  anything else that needs to be accessible |
 *                |  from your views.                          |
 *                |                                            |
 *                '.__________________________________________.'
 */

// this is used by the example component 'greeter', feel free to delete it
RukusApp.version = '1.0.0';

// Mount everything !
riot.mount('*');
require("file?name=index.html!./index.html");
