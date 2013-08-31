"use strict";

var argv = process.argv,
  available = ['parser'],
  suites = [];

if (argv.length === 2) {
  suites = available;
} else if (argv[2].match( /^(parser|compiler|output)$/ ) ) {
  suites.push[argv[2]];
} else {
  console.log('Test suite "' + argv[2] + '" not found.' + "\n");

  process.exit(1);
}

var bang = require('./bang');

var index = 0;

while ( index < suites.length ) {
  var suite = suites[index];

  var tests = require('./tests/' + suite ),
    failures = [];

  for (var index in tests) {
    var test = tests[index];

    var failure = false;

    console.log( 'Running test #' + index + ': ' + test.name + "\n" );

    var output = bang[suite](test.input);

    if (output.toString() !== test.output.toString()) {
      console.log( '  Test failure!' + "\n" );
      console.log( '    Expected:' + "\n" );
      console.log( test.output.toString() );
      console.log( '    Compiled:' + "\n" );
      console.log( output.toString() );

      failure = true;
    }

    failure && failures.push( index );
  }
}