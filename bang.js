"use strict";

var parse = function (data) {
  data = data.split('');

  var index = 0;
  var length = data.length;
  var segments = [];
  var buffer = [];
  var state = 'output';

  while (index < length) {
    var char = data[index];

    switch (char) {
      case 's':
        var length = buffer.length;

        if (length < 3 || state !== 'output') {
          buffer.push(char);

          break;
        }

        var lt_index = length - 3,
          bang_index = length - 2,
          j_index = length - 1;

        var lt_check = buffer[lt_index] === '<',
          bang_check = buffer[bang_index] === '!',
          j_check = buffer[j_index] === 'j';

        var is_bang = lt_check && bang_check && j_check;

        if (is_bang === true) {
          state = 'code';

          buffer.pop();
          buffer.pop();
          buffer.pop();

          segments.push( buffer.join('') );

          segments.push( '<!js' );

          buffer = [];
        } else {
          buffer.push( 's' );
        }

        break;
      case '>':
        if (buffer.length < 1 || state !== 'code' ) {
          buffer.push(char);

          break;
        }

        if (buffer[buffer.length - 1] === '!') {
          state = 'output';

          buffer.pop();

          segments.push( buffer.join('') );
          segments.push( '!>' );

          buffer = [];
        } else {
          buffer.push( 's' );
        }

        break;
      case '"':
      case '\'':
      case '\\':
      case ':':
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