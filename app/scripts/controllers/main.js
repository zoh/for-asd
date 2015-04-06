'use strict';

/**
 * @ngdoc function
 * @name tzAsdApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tzAsdApp
 */
angular.module('tzAsdApp')

  .service('TumblrResource', function ($resource, blog_name, api_key) {
    return $resource('https://api.tumblr.com/v2/blog/:blog_name/posts/text?callback=JSON_CALLBACK', {
      blog_name: blog_name,
      api_key: api_key
    }, {
      fetch: {
        method: 'JSONP', isArray: true, transformResponse: function (data) {
          return data.response.posts;
        }
      }
    });
  })

  .factory('TumblrService', function (TumblrResource) {
    var posts;
    return {
      getPosts: function () {
        if (posts) {
          return posts;
        }
        return posts = TumblrResource.fetch();
      },

      getPostById: function (postId) {
        return this.getPosts().$promise.then(function (posts) {
          // find by id
          return (posts || []).filter(function (post) {
            return +post.id === +postId;
          })[0];
        });
      }
    }
  })

  .controller('MainCtrl', function ($q, $scope, TumblrService) {
    $scope.posts = TumblrService.getPosts();
    $scope.$loading = true;

    function end() {
      $scope.$loading = false;
    }

    $scope.posts.$promise.then(function (/*res*/) {
      end();
    }).catch(end);
  });
