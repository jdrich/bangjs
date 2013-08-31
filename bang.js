"use strict";

var parse = function (data) {
  data = data.split('');

  var index = 0;
  var length = data.length;
  var segments = [];
  var buffer = '';
  var tag_buffer = '';
  var state = 'output';

  while (index < length) {
    var char = data[index];

    switch (char) {
      case '!':
      case 's':
      case '"':
      case '\'':
      case '\\':
      case ':':

      case '>':
        if ( state === 'code' && tag_buffer === '!') {
          // Closing a ! tag.
          buffer.pop();

          segments.push(buffer.join(''));
        }
      case '<':
        if ( state === 'output' && tag_buffer === '') {
          tag_buffer = '<';
        }
      default:
        buffer.push(char);

        break;
    }

    index++;
  }


  return segments;
};

var get_body = function (data) {
  var body = 'var __ret = \'\';';

  data = parse(data);

  console.log( data );

  body += 'return __ret;';

  return body;
};

module.exports.compile = function ( data ) {
  return new Function('__data', get_body(data));
};