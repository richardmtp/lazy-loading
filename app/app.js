'use strict';

// create the module and name it app
var app = angular.module('myApp', ['ngRoute', 'angular-loading-bar']);

// configure our routes
app.config(function($routeProvider, $locationProvider, cfpLoadingBarProvider) {
cfpLoadingBarProvider.latencyThreshold = 500;
  $locationProvider.hashPrefix('');
  $routeProvider

    // route for the home page
    .when('/', {
      templateUrl : 'home/home.html',
      controller  : 'homeController'
    })
    
});