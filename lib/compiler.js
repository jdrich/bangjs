var compile = function ( data ) {
    return new Function(getBody(data));
};

var getBody = function (data) {
    var body = 'var __ret = \'\';\n';

    body += 'var print = function(to_print) { __ret += to_print; };\n';

    var token = 0;
    var state = 'output';

    while(data.length) {
        token = data.shift();

        switch(token) {
            case '<!js':
                state = 'javascript';

                break;
            case '!>':
                if (state === 'javascript') {
                    state = 'output';
                }

                break;
            default:
                if (state === 'output') {
                    body += '__ret += \'' + token.replace(/\'/, '\\\'') + '\';\n';
                } else {
                    body += token;
                }

                break;
        }
    }

    body += 'return __ret;';

    return body;
};

module.exports = compile;
