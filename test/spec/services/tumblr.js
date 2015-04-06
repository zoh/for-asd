'use strict';


describe('Service: TumblrService', function () {

  // load the controller's module
  beforeEach(module('tzAsdApp'));

  var TumblrResource;
  var TumblrService;
  var httpBackend;
  var blog_name, api_key;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_TumblrResource_, _TumblrService_, _blog_name_, _api_key_, $httpBackend) {
    TumblrResource = _TumblrResource_;
    TumblrService = _TumblrService_;
    httpBackend = $httpBackend;
    blog_name = _blog_name_;
    api_key = _api_key_;
  }));

  describe('Tumblr Resource', function () {
    it('should get resource from TumblrResource', function () {
      var returnData = {response: {blog: {}, posts: [{id: 1}]}};
      httpBackend.expectJSONP(
        'http://api.tumblr.com/v2/blog/' + blog_name + '/posts/text?callback=JSON_CALLBACK' +
        '&api_key=' + api_key)
        .respond(returnData);

      TumblrResource.fetch(function (posts) {
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

  describe('Tumblr Service', function () {
    var posts = [{id: 1, title: 'Hi'}, {id: 2, title: 'f*ck out here!'}];

    afterEach(function () {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });
    beforeEach(function () {
      var returnData = {response: {posts: posts}};
      httpBackend.expectJSONP(
        'http://api.tumblr.com/v2/blog/' + blog_name + '/posts/text?callback=JSON_CALLBACK' +
        '&api_key=' + api_key)
        .respond(returnData);
    });

    it('should init data from Tumblr Resource', function () {
      var postsRes = TumblrService.getPosts();
      postsRes.$promise.then(function ($posts) {
        expect(angular.toJson($posts)).toEqual(angular.toJson(posts));
      });
      httpBackend.flush();

      // single request
      TumblrService.getPosts().$promise.then(function ($posts) {
        expect(angular.toJson($posts)).toEqual(angular.toJson(posts));
      });
    });

    describe('Get post by id', function () {

      it('should return correct post', function () {
        var post = TumblrService.getPostById(1);
        post.then(function ($post) {
          expect($post.toJSON()).toEqual(posts[0]);
        });
        httpBackend.flush();
      });

      it('should throw if unvalid postId', function () {
        var post = TumblrService.getPostById(1123123123);
        post.then(function ($post) {
          expect($post).toBeUndefined()
        });
        httpBackend.flush();
      });
    });
  });
});
