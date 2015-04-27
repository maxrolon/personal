// # Content Helper
// Usage: `{{content}}`, `{{content words="20"}}`, `{{content characters="256"}}`
//
// Turns content html into a safestring so that the user doesn't have to
// escape it or tell handlebars to leave it alone with a triple-brace.
//
// Enables tag-safe truncation of content by characters or words.

var hbs             = require('express-hbs'),
    _               = require('lodash'),
    downsize        = require('downsize'),
    downzero        = require('../utils/downzero'),
    content;

content = function (options) {
    var truncateOptions = (options || {}).hash || {};
    truncateOptions = _.pick(truncateOptions, ['words', 'characters','imageOnly']);
    _.keys(truncateOptions).map(function (key) {
        truncateOptions[key] = parseInt(truncateOptions[key], 10);
    });
    
    if (truncateOptions.imageOnly){
	    var img = String(this.html).match(/<img[^>]*([\s\S]*?)>/);
	    if (img){
		    return new hbs.handlebars.SafeString(img[0]);
	    } else {
		    return '';
	    }
	  }
    
    /**
     * As a user can insert a custom excerpt inside 
     * <excerpt> </excerpt>, the two lines below strip
     * out the excerpt from the content
     *
     */
    
    /*jslint regexp:true */
    var noExcerpt = String(this.html).replace(/<excerpt[^>]*>([\s\S]*?)<\/excerpt>/gm,'');
    this.html = noExcerpt;
    /*jslint regexp:false */
    
    /**
     * Lines below look for the first image in the content
     * and inserts HTML to separate the text into a child element
     *
     */
    var imgPos = String(this.html).indexOf('<p><img');
    if (imgPos >= 0){
      var text = '<div class="text transparent">' + String(this.html).substring(0, imgPos-1) + '</div>';
      var img  = String(this.html).substring(imgPos, String(this.html).length);
      this.html = text + img;
    }
    
    if (truncateOptions.hasOwnProperty('words') || truncateOptions.hasOwnProperty('characters')) {
        // Legacy function: {{content words="0"}} should return leading tags.
        if (truncateOptions.hasOwnProperty('words') && truncateOptions.words === 0) {
            return new hbs.handlebars.SafeString(
                downzero(this.html)
            );
        }

        return new hbs.handlebars.SafeString(
            downsize(this.html, truncateOptions)
        );
    }
    
    /**
     * Add onload event to all images
     *
     */
     this.html = this.html.replace(/<img(.[^>]*)>/g,'<img$1 onload="imgLoaded(this)">');
     this.html = String(this.html).replace(/(<p><\/p>)+/gm, '');
    
    return new hbs.handlebars.SafeString(this.html);
};

module.exports = content;
