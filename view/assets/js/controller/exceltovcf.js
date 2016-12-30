var myapp=angular.module('excel',['ngFileUpload']);

myapp.controller('exceltovcf',['Upload','$scope', '$window', '$http', 
    function (Upload,$scope, $window, $http) 
{
     $scope.ConvertExcelToVcf=function()
    {   
        $scope.excelForm=true;
       $scope.dropdown1=false;
    }
 $scope.dropdown=function()
    {   
        $scope.dropdown1=true;
         $scope.excelForm=false;
      
    }
     $scope.ExcelToVcf = function (file) 
     {
        var reader = new FileReader();
          $scope.filename=file.name;
          Upload.upload({
                url: 'http://localhost:3000/exceltocvf', 
                data:( {
                    file: file
                } )
            }).then(function (res) 
                    {
                        console.log('res',res);
                    },
                    function Error(res) 
                    {
                        console.log('err',res);
                    });
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
