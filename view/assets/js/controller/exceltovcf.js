var myapp=angular.module('excel',['ngFileUpload']);

myapp.controller('exceltovcf',['Upload','$scope', '$window', '$http', 
    function (Upload,$scope, $window, $http) 
{
     $scope.ConvertExcelToVcf=function()
    {   
        $scope.excelForm=true;
        $scope.Vcfform=false;
        $scope.Vcftocvf=false;
    }

    $scope.ConvertVcfToExcel=function()
    {
        $scope.excelForm=false;
        $scope.Vcfform=true;
        $scope.Vcftocvf=false;
    }

    $scope.ConvertVcfToVcf=function()
    {
        $scope.excelForm=false;
        $scope.Vcfform=false;
        $scope.Vcftocvf=true;
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

   
    $scope.VcfToExcel=function()
    {
        console.log('convert vcf to excel');
    }

    $scope.VcfToVcf=function(file)
    {
        Upload.upload({
                url: 'http://localhost:3000/vcftovcf',
                data: ({
                    file: file
                })
            }).then(
                function success(res) 
                {
                    console.log('res', res);
                },
                function Error(err) 
                {
                    console.log('err', err)
                });
    }           
}]);
