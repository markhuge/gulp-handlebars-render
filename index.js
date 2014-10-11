var through     = require('through2'),
    handlebars  = require('handlebars'),
    gutil       = require('gulp-util'),
    PluginError = gutil.PluginError;


module.exports = function (data) {
    
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit(
                'error',
                new gutil.PluginError('gulp-handlebars-render', 'Streaming not supported')
            );
        }

        var template = handlebars.compile(file.contents.toString());
        file.contents = new Buffer(template(data));
        file.path = gutil.replaceExtension(file.path, '.html');

        this.push(file);
        cb();
    });
};