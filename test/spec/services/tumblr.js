'use strict';


describe('Service: TumblrService', function () {

  // load the controller's module
  beforeEach(module('tzAsdApp'));

  var TumblrService;
  var httpBackend;
  var blog_name, api_key;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_TumblrService_, _blog_name_, _api_key_, $httpBackend) {
    TumblrService = _TumblrService_;
    httpBackend = $httpBackend;
    blog_name = _blog_name_;
    api_key = _api_key_;
  }));

  it('should get resource from TumblrService', function () {
    var returnData = {response: {blog: {}, posts: [{id: 1}]}};
    httpBackend.expectJSONP(
      'http://api.tumblr.com/v2/blog/' + blog_name + '/posts?callback=JSON_CALLBACK' +
      '&api_key=' + api_key)
      .respond(returnData);

    TumblrService.fetch(function (posts) {
      // must be posts
      expect(posts[0].toJSON()).toEqual({id: 1});
    });

    httpBackend.flush();
  });

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
});
