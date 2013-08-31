var assert = require( 'assert' );

module.exports.run = function( bang ) {
    console.log('Running unit tests for bangjs parser');
    
    try {   
        assert.deepEqual(
            bang.parse(''),
            [''],
            'Empty string returns single empty token.'
        );
        
        assert.deepEqual(
            bang.parse('hello'),
            ['hello'],
            'Tagless string returns single token.'
        );
        
        assert.deepEqual(
            bang.parse('<strong>hello</strong>'),
            ['<strong>hello</strong>'],
            'Tagless HTML string returns single token.'
        );
        
        assert.deepEqual(
            bang.parse('hello!'),
            ['hello!'],
            'String with ! doesn\'t puke.'
        );
        
        assert.deepEqual(
            bang.parse('hello<!js world !>'),
            ['hello', '<!js', ' world ', '!>'],
            'Parser detects opening and closing tags.'
        );
        
        assert.deepEqual(
            bang.parse('hello<!js "<!js !>" !>'),
            ['hello', '<!js', ' "<!js !>" ', '!>'],
            'Parser ignores opening and closing tags in quotes.'
        );
        
        assert.deepEqual(
            bang.parse('hello<!js "<!js !>\\"" !>'),
            ['hello', '<!js', ' "<!js !>\\"" ', '!>'],
            'Parser ignores opening and closing tags in quotes.'
        );        
        
        assert.deepEqual(
            bang.parse('hello<!js \'<!js !>\' !>'),
            ['hello', '<!js', ' \'<!js !>\' ', '!>'],
            'Parser ignores opening and closing tags in quotes.'
        );
        
        assert.throws(
            function () { bang.parse('hello<!js world ') },
            Error,
            'Parser detects exit in invalid state'
        );
        
        assert.throws(
            function () { bang.parse('hello<!js') },
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
