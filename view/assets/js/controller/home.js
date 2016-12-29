var MyApp=angular.module('home',
        [
            'ngRoute'
            //'angular-loading-bar'
        ]);



MyApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
         when('/home/', {
            templateUrl: '/tpl/home.html',
            controller: 'home'
        }).
        when('/exceltovcf/', {
            templateUrl: '/tpl/exceltovcf.html',
            controller: 'home'
        }).
        when('/vcfsplitter/', {
            templateUrl: '/tpl/vcfsplitter.html',
            controller: 'home'
        }).
        when('/vcftoexcel/', {
            templateUrl: '/tpl/vcftoexcel.html',
            controller: 'home'
        }).

        otherwise({
            redirectTo: '/home'
        });
}]);
/*
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        //cfpLoadingBarProvider.includeSpinner = true;
        //cfpLoadingBarProvider.latencyThreshold = 500;
        //cfpLoadingBarProvider.spinnerTemplate = '<div><span class="loading">Loading...<span/></div>';
        //cfpLoadingBarProvider.spinnerTemplate = '<div class="loading"><span class="spinner"><div></div><div></div><div></div><div></div></span></div>';
        cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';
    }]);*/

MyApp.controller('homeClt',['$scope', '$window', '$http', 
    function ($scope, $window, $http) 
{
    
}]);


MyApp.controller('home',['$scope', '$window', '$http', 
    function ($scope, $window, $http) 
{

}]);
