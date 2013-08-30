"use strict";

var parse = function (data) {

};

var get_body = function (data) {
    var body = 'var __ret = \'\';';

    body += 'return __ret;';

    return body;
};

module.exports.compile = function ( data ) {
  return new Function('__data', get_body(data));
};