var ASSUMPTIONS = {
    'undefined'        : 'undefined',
    'number'           : 'number',
    'boolean'          : 'boolean',
    'string'           : 'string',
    '[object Function]': 'function',
    '[object RegExp]'  : 'regexp',
    '[object Array]'   : 'array',
    '[object Date]'    : 'date',
    '[object Error]'   : 'error'
}

var REGEX_DATE = new RegExp('[a-zA-Z][a-z][a-z]\\s[a-zA-Z][a-z][a-z]\\s\\d\\d\\s\\d\\d\\d\\d\\s\\d\\d:\\d\\d:\\d\\d*');
TOSTRING = Object.prototype.toString;
REPLACE_LAST_COMMA = /,([^,]*)$/;

var type = function(o) {
    return ASSUMPTIONS[typeof o] || ASSUMPTIONS[TOSTRING.call(o)] || (o ? 'object' : 'null');
};

module.exports = type;