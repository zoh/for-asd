'use strict';

/**
 * @ngdoc overview
 * @name tzAsdApp
 * @description
 * # tzAsdApp
 *
 * Main module of the application.
 */
var app = angular
  .module('tzAsdApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


app.constant('blog_name', 'peacecorps.tumblr.com');
app.constant('api_key', 'fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4');


app.directive('loadingContainer', function () {
  return {
    restrict: 'A',
    templateUrl: 'views/spiner.html',
    scope: false,
    link: function (scope, element, attrs) {
      scope.$watch(attrs.loadingContainer, function (value) {
        element.toggleClass('ng-hide', !value);
      });
    }
  };
});



app.directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});
