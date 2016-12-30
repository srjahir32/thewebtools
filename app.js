	var express = require('express'); 
    var app = express(); 
    var bodyParser = require('body-parser');
    var multer = require('multer');
    var excel=require(__dirname +'/api/excel.js');
    var vcf=require(__dirname +'/api/VcftoExcel.js');
    var vcftovcf=require(__dirname +'/api/vcftovcf.js');
    var vcftocsv=require(__dirname +'/api/VcftoCsv.js');
    var email=require(__dirname +'/api/email.js');
    var router = express.Router();
    var http = require('http');

    app.use(bodyParser.json());  


app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');


app.get('/', function (req, res) {
  res.send('Hello World!');
});


router.get('/test',function(req,res)
{
    res.sendFile(__dirname + "/index.html");
});


router.get('/',function(req,res)
{
    res.sendFile(__dirname + "/view/index.html");
});

app.post('/exceltovcf',excel.exceltovcf);
app.post('/getExcelData',excel.getExcelData);

app.post('/vcftoEcel',vcf.vcftoexcel);

app.post('/vcftovcf',vcftovcf.vcftovcf);
app.post('/vcftocsv',vcftocsv.vcftoCsv);
app.post('/sendmail',email.sendmail);


app.use('/', router);

app.use("/npm", express.static(__dirname + '/node_modules'));
// for web site direction path
app.use("/images", express.static(__dirname + '/view/images'));
app.use("/js", express.static(__dirname + '/view/assets/js'));
app.use("/css", express.static(__dirname + '/view/assets/css'));
app.use("/fonts",express.static(__dirname+'/view/assets/fonts'));
app.use("/assets", express.static(__dirname + '/view/assets'));
app.use("/view", express.static(__dirname + '/view'));
app.use("/uploads", express.static(__dirname + '/uploads'));
app.use("/tpl",express.static(__dirname+'/view/assets/tpl'));


http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
