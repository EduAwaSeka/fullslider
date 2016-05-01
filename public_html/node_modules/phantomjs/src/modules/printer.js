/*jslint sloppy: true, nomen: true */
/*global exports:true,phantom:true */

exports.create = function (opts) {
    return phantom.createPrinter();
};
