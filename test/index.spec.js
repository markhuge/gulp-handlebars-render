var expect = require('chai').expect,
    es     = require('event-stream'),
    File   = require('vinyl'),
    render = require('../');

describe('gulp-handlebars-render', function() {
  
  it('should render a template with data', function(done){
    var fakeFile = new File({
          contents: new Buffer('<h1>{{test}}</h1>'),
          path: '/some/path'
        });

    var myRender = render({test: "test data"});
    myRender.once('data', function(file){
      var result = file.contents.toString();
      expect(result).to.equal('<h1>test data</h1>');
      done();
    });
    myRender.write(fakeFile);
  });

  it('return error with stream', function(done){
    var fakeFile = new File({
      contents: es.readArray(['stream', 'with', 'those', 'contents']),
      path: '/some/path'
    });
    var myRender = render({test: "test data"});
    myRender.on('error', function(err){
      expect(err.message).to.equal("Streaming not supported");
      done();
    });
    myRender.write(fakeFile);

  });


});