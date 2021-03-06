var parse = function (data) {
    data = data.split('');

    var index = 0,
        length = data.length,
        segments = [],
        buffer = [],
        last_state = '';
        state = 'output';

    while (index < length) {
        var curr = data[index];

        if( state === 'escape' ) {
            state = last_state;

            buffer.push(curr);
        } else {
            switch (curr) {
                case 's':
                    if (buffer.length < 3 || state !== 'output') {
                        buffer.push(curr);

                        break;
                    }

                    var lt_index = buffer.length - 3,
                        bang_index = buffer.length - 2,
                        j_index = buffer.length - 1;

                    var lt_check = buffer[lt_index] === '<',
                        bang_check = buffer[bang_index] === '!',
                        j_check = buffer[j_index] === 'j';

                    var is_bang = lt_check && bang_check && j_check;

                    if (is_bang === true) {
                        state = 'code';

                        buffer.pop();
                        buffer.pop();
                        buffer.pop();

                        segments.push( buffer.join('') );

                        segments.push( '<!js' );

                        buffer = [];
                    } else {
                        buffer.push(curr);
                    }

                    break;
                case '>':
                    if (buffer.length < 1 || state !== 'code' ) {
                        buffer.push(curr);

                        break;
                    }

                    if (buffer[buffer.length - 1] === '!') {
                        state = 'output';

                        buffer.pop();

                        segments.push( buffer.join('') );
                        segments.push( '!>' );

                        buffer = [];
                    } else {
                        buffer.push( 's' );
                    }

                    break;
                case '\\':
                    if( state === 'quote' || state === 'quote2' ) {
                        last_state = state;
                        state = 'escape';
                    }

                    buffer.push( '\\' );

                    break;
                case '"':
                    if( state === 'code' ) {
                        state = 'quote2';
                    } else if( state === 'quote2' ) {
                        state = 'code';
                    }

                    buffer.push( '"' );

                    break;
                case '\'':
                    if( state === 'code' ) {
                        state = 'quote';
                    } else if( state === 'quote' ) {
                        state = 'code';
                    }

                    buffer.push( '\'' );

                    break;
                case ':':
                default:
                    buffer.push(curr);

                    break;
            }
        }

        index++;
    }

    if( state !== 'output') {
        throw new Error( 'Finished parsing in an invalid state! Missing closing tag.' );
    }

    buffer.length && segments.push(buffer.join(''));

    return segments.length === 0 ? [''] : segments;
};

module.exports = parse;
