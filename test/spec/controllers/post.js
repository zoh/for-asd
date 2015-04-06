'use strict';

describe('Controller: PostCtrl', function () {

  // load the controller's module
  beforeEach(module('tzAsdApp'));

  var PostCtrl,
    controller,
    httpBackend,
    blog_name, api_key,
    scope;

  var posts = [{id: 1, title: 'Hi'}, {id: 2, title: 'f*ck out here!'}];

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, _api_key_, _blog_name_) {
    scope = $rootScope.$new();
    controller = $controller;
    httpBackend = $httpBackend;
    blog_name = _blog_name_;
    api_key = _api_key_;
  }));

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

  it('should attach a list of awesomeThings to the scope', function () {
    PostCtrl = controller('PostCtrl', {
      $scope: scope,
      $routeParams: {id: 1}
    });
    httpBackend.flush();

    expect(scope.post.toJSON()).toEqual(posts[0]);
  });
});
