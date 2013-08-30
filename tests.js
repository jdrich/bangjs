"use strict";

var tests = [];

module.exports = tests;

var test = function (new_test) {
  tests.push(new_test);
};

var make_test = function ( name, input, compiled, data, output ) {
  tests.push(
    {
      'name': name,
      'input': input,
      'compiled': compiled,
      'data': data,
      'output': output
    }
  );
};

var bang_wrapper = function ( wrap ) {
  wrap = wrap || '';

  return '';
};

/*make_test(
  'Testing empty template invocation',
  '',
  ''

);*/

make_test(
  'Basic tag detection',
  '<!js var three = 3; !>',
  'var three = 3;',
  null,
  ''
);

make_test(
  'Echo',
  'hello<!js var three = 3; !>',
  'var three = 3;'
);