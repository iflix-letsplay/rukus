/* global RukusApp, riot */

/* -------------------------------------------------- *\
 *                  _                                 *
 *                 | |                     ,--.!,     *
 *      _ __ _    _| | ___   _ ___      __/   -*-     *
 *      | '__| | | | |/ / | | / __|   ,d08b.  '|`     *
 *      | |  | |_| |   <| |_| \__ \   0088MM          *
 *      |_|   \__,_|_|\_\\__,_|___/   `9MMP'          *
 *                    by iflix.com                    *
 *                                                    *
 * -------------------------------------------------- */

// This is a rukus app.

// this is used by the example component 'greeter', feel free to delete it
RukusApp.version = '1.0.0'

// Mount everything !
riot.mount('*')
require('file?name=index.html!./index.html')

// enjoy.
