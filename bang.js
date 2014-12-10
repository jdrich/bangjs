var parse = require('./lib/parser');

var compile = require('./lib/compiler');

var generate = function(template) {
    return compile(parse(template));
};

module.exports = generate;
