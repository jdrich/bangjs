"use strict";

var tests = require( './tests' );

tests.makeTest(
  'Test empty strings returns no tokens',
  '',
  ['']
);

module.exports = tests;

/*make_test(
  'Testing empty template invocation',
  '',
  ''

);

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
);*/