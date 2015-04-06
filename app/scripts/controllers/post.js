'use strict';

/**
 * @ngdoc function
 * @name tzAsdApp.controller:PostCtrl
 * @description
 * # PostCtrl
 * Controller of the tzAsdApp
 */
angular.module('tzAsdApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/post/:id', {
        templateUrl: 'views/post.html',
        controller: 'PostCtrl'
      });
  })

  .controller('PostCtrl', function ($scope, $routeParams, $window, $location,
                                    $anchorScroll, TumblrService) {
    $scope.$loading = true;
    TumblrService.getPostById($routeParams.id).then(function (post) {
      $scope.$loading = false;
      $scope.post = post;

      gotoTop();
    });

    function gotoTop() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $anchorScroll();
    }

    $scope.back = function () {
      $window.history.back();
    };
  });
