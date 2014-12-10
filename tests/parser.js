var assert = require( 'assert' );

module.exports.run = function( parse     ) {
    console.log('Running unit tests for bangjs parser');

    try {
        assert.deepEqual(
            parse(''),
            [''],
            'Empty string returns single empty token.'
        );

        assert.deepEqual(
            parse('hello'),
            ['hello'],
            'Tagless string returns single token.'
        );

        assert.deepEqual(
            parse('don\'t hello\''),
            ['don\'t hello\''],
            'Strings with quotes don\'t get stripped.'
        );

        assert.deepEqual(
            parse('<strong>hello</strong>'),
            ['<strong>hello</strong>'],
            'Tagless HTML string returns single token.'
        );

        assert.deepEqual(
            parse('hello!'),
            ['hello!'],
            'String with ! doesn\'t puke.'
        );

        assert.deepEqual(
            parse('hello<!js world !>'),
            ['hello', '<!js', ' world ', '!>'],
            'Parser detects opening and closing tags.'
        );

        assert.deepEqual(
            parse('hello<<!js world !>>'),
            ['hello<', '<!js', ' world ', '!>', '>'],
            'Parser detects broken opening and closing tags.'
        );

        assert.deepEqual(
            parse('hello<!js "<!js !>" !>'),
            ['hello', '<!js', ' "<!js !>" ', '!>'],
            'Parser ignores opening and closing tags in quotes.'
        );

        assert.deepEqual(
            parse('hello<!js "<!js !>\\"" !>'),
            ['hello', '<!js', ' "<!js !>\\"" ', '!>'],
            'Parser ignores opening and closing tags in quotes.'
        );

        assert.deepEqual(
            parse('hello<!js \'<!js !>\' !>'),
            ['hello', '<!js', ' \'<!js !>\' ', '!>'],
            'Parser ignores opening and closing tags in quotes.'
        );

        assert.deepEqual(
            parse('hello <!js var three = 3; while(three) { !>asdf<!js three--; } !>')  ,
            [
                'hello ',
                '<!js',
                ' var three = 3; while(three) { ',
                '!>',
                'asdf',
                '<!js',
                ' three--; } ',
                '!>'
            ],
            'Parser ignores opening and closing tags in quotes.'
        );

        assert.throws(
            function () { parse('hello<!js world ') },
            Error,
            'Parser detects exit in invalid state'
        );

        assert.throws(
            function () { parse('hello<!js') },
            Error,
            'Parser detects exit in invalid state'
        );

        console.log('Remarkably, everything went okay!');
    } catch (error) {
        console.log( 'Test failure: ' + error.message );
        console.log( 'Expected: ', error.expected );
        console.log( '  Actual: ', error.actual );

        process.exit(1);
    }
};
