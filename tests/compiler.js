var assert = require( 'assert' );

module.exports.run = function( bang ) {
    console.log('Running unit tests for bangjs compiler');

    try {
        assert.equal(
            bang('')(),
            '',
            'Empty string.'
        );

        assert.equal(
            bang('hello')(),
            'hello',
            'Tagless string.'
        );

        assert.equal(
            bang('hello\'')(),
            'hello\'',
            'Quotey string.'
        );

        assert.equal(
            bang('<strong>hello</strong>')(),
            '<strong>hello</strong>',
            'Tagless HTML string.'
        );

        assert.equal(
            bang('hello!')(),
            'hello!',
            'String with !'
        );

        assert.equal(
            bang('hello <!js print(this.world); !>').call({'world': 'World!'}),
            'hello World!'  ,
            'Opening and closing tags.'
        );

        assert.equal(
            bang('hello<!js "<!js !>"; !>')(),
            'hello',
            'Bullshit.'
        );

        assert.equal(
            bang('hello<!js "<!js !>\\""; !>')(),
            'hello',
            'Parser ignores opening and closing tags in quotes.'
        );

        assert.equal(
            bang('hello<!js \'<!js !>\'; !>')(),
            'hello',
            'Parser ignores opening and closing tags in quotes.'
        );

        assert.equal(
            bang('hello <!js var three = 3; while(three) { !>asdf<!js three--; } !>')(),
            'hello asdfasdfasdf',
            'Parser ignores opening and closing tags in quotes.'
        );

        console.log('Remarkably, everything went okay!');
    } catch (error) {
        console.log( 'Test failure: ' + error.message );
        console.log( 'Expected: ', error.expected );
        console.log( '  Actual: ', error.actual );

        process.exit(1);
    }
};
