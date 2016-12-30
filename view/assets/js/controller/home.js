var MyApp=angular.module('home',
        [
            'ngRoute',
            'ngFileUpload'
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


MyApp.controller('home',['Upload','$scope', '$window', '$http', 
    function (Upload,$scope, $window, $http) 
{

 
     $scope.ExcelToVcf = function (file) 
     {
        
        var reader = new FileReader();
          $scope.filename=file.name;
          Upload.upload({
                url: 'http://localhost:3000/exceltovcf', 
                data:( {
                    file: file,
                } )
            }).then(function (res) 
                    {
                        console.log('res',res);
                          
                        
                          $scope.path=res.data.path;
                          $scope.download = true;
                          console.log("path",$scope.path);
                           var params = {
                            "path":$scope.path,
                            "email":'kumbhani.bhavesh.1@gmail.com'
                        };
                                $http({
                                    method:"POST",
                                    url:"http://localhost:3000/sendmail",
                                    data: angular.toJson(params),
                                    
                                   }).then(
                                    function success(res)
                                    {
                                        console.log("message successfully send.");
                                    },
                                    function error(res)
                                    {
                                        console.log("message not sent",res);
                                   });


                    },
                    function Error(res) 
                    {
                        console.log('err',res);
                    });


                      
                      // console.log("$sope.path",$scope.path);
                   /*    
                        var params = {
                            "path":$scope.path,
                            "email":'kumbhani.bhavesh.1@gmail.com'
                        };
                                $http({
                                    method:"POST",
                                    url:"http://localhost:3000/sendmail",
                                    data: angular.toJson(params),
                                    
                                }).then(
                                    function success(res)
                                    {
                                        console.log("message successfully send.");
                                    },
                                    function error(res)
                                    {
                                        console.log("message not sent",res);
                                    }

)*/
     }  


    $scope.Convert=function(selected)
    {
        var file=selected;
        console.log('selected',$scope.selectedName);
        if($scope.selectedName)
        {

             if($scope.selectedName=="csv")
            {
                    // csv

                    Upload.upload({
                    url: 'http://localhost:3000/vcftocsv',
                    data: ({
                        file: file
                    })
                }).then(
                    function success(res) 
                    {
                        console.log('res', res);
                        $scope.path=res.data.path;
                        $scope.download = true;
                    },
                    function Error(err) 
                    {
                        console.log('err', err)
                    });
            }
            if($scope.selectedName=="xlsx")
            {
                // excel

                
                    Upload.upload({
                            url: 'http://localhost:3000/vcftoEcel',
                            data: ({
                                file: file
                            })
                        }).then(
                            function success(res) 
                            {
                                console.log('res', res);
                                $scope.path=res.data.path;
                                $scope.download = true;
                            },
                            function Error(err) 
                            {
                                console.log('err', err)
                            });
                    
            }

            if($scope.selectedName=="vcf")
            {
                // vcf

                
                    Upload.upload({
                        url: 'http://localhost:3000/vcftovcf',
                        data: ({
                            file: file
                        })
                    }).then(
                        function success(res) 
                        {
                            console.log('res', res);
                            $scope.path=res.data.path;
                            $scope.download = true;
                        },
                        function Error(err) 
                        {
                            console.log('err', err)
                        });
                            
                    }
        }
        else
        {
            console.log('please select file ');
        }
       
    }
}]);
