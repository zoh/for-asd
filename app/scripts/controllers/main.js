'use strict';

/**
 * @ngdoc function
 * @name tzAsdApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tzAsdApp
 */
angular.module('tzAsdApp')

  .service('TumblrService', function ($resource, blog_name, api_key) {
    return $resource('http://api.tumblr.com/v2/blog/:blog_name/posts/text?callback=JSON_CALLBACK', {
      blog_name: blog_name,
      api_key: api_key
    }, {
      fetch: {method: 'JSONP', isArray: true, transformResponse: function (data) {
        return data.response.posts;
      }}
    });
  })

  .controller('MainCtrl', function ($q, $scope, TumblrService) {
    $scope.posts = TumblrService.fetch();
    $scope.$loading = true;

    function end() {
      $scope.$loading = false;
    }

    $scope.posts.$promise.then(function (res) {
      //console.log(res);
      end();
    }).catch(end);
  });
