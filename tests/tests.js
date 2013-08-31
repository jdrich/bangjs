var tests = [];

var exports = {};

exports.tests = tests;

exports.makeTest = function ( name, input, output ) {
  tests.push(
    {
      'name': name,
      'input': input,
      'output': output
    }
  );
};

module.exports = exports;