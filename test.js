"use strict";

var bang = require('./bang');

var tests = require('./tests');

var failures = [];

for (var index in tests) {
  var test = tests[index];

  var failure = false;

  console.log( 'Running test #' + index + ': ' + test.name + "\n" );

  var compiled = bang.compile(test.input);

  if (compiled.toString() !== test.compiled.toString()) {
    console.log( '  Compilation failure!' + "\n" );
    console.log( '    Expected:' + "\n" );
    console.log( test.compiled.toString() );
    console.log( '    Compiled:' + "\n" );
    console.log( compiled.toString() );

    failure = true;
  }

  var output = compiled( test.data );

  if (output !== test.output) {
    console.log( '  Execution failure!' + "\n" );
    console.log( '    Expected:' + "\n" );
    console.log( test.output );
    console.log( '    Compiled:' + "\n" );
    console.log( output );

    failure = true;
  }

  failure && failures.push( index );
}