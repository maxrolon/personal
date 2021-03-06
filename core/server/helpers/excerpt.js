// # Excerpt Helper
// Usage: `{{excerpt}}`, `{{excerpt words="50"}}`, `{{excerpt characters="256"}}`
//
// Attempts to remove all HTML from the string, and then shortens the result according to the provided option.
//
// Defaults to words="50"

var hbs             = require('express-hbs'),
    _               = require('lodash'),
    downsize        = require('downsize'),
    excerpt;

excerpt = function (options) {
    var truncateOptions = (options || {}).hash || {},
        excerpt;

    truncateOptions = _.pick(truncateOptions, ['words', 'characters']);
    _.keys(truncateOptions).map(function (key) {
        truncateOptions[key] = parseInt(truncateOptions[key], 10);
    });

    /*jslint regexp:true */
   
		excerpt = String(this.html).match(/<excerpt[^>]*>([\s\S]*?)<\/excerpt>/);
    excerpt = excerpt ? excerpt[1] : String(this.html).replace(/<\/?[^>]+>/gi, '');
    excerpt = String(excerpt)
    .replace(/(\r|\n|\r|<br[ ]?\/?>|[ ]{2,999})+/gm, ' ');
   
    /*jslint regexp:false */

    if (!truncateOptions.words && !truncateOptions.characters) {
        truncateOptions.words = 9999;
    }
    
    if (truncateOptions.characters){
      excerpt = excerpt.replace(/<(?:.[^>]*)>/gm, ' ');
    }
    
    return new hbs.handlebars.SafeString(
        downsize(excerpt, truncateOptions)
    );
};

module.exports = excerpt;
