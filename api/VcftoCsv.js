
var vcard = require('vcard-json');
var fs = require('fs');
var json2csv = require('json2csv');
var multer = require('multer');
var vCard = require('vcards-js');

exports.vcftoCsv = function (req, res) {

  var storage = multer.diskStorage({ //multers disk storage settings

  });

  var upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) { //file filter
      if (['vcf'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
        return callback(new Error('Wrong extension type'));
      }
      callback(null, true);
    }
  }).single('file');


  upload(req, res, function (err) {


    //console.log('file is', req.file);
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    if (!req.file) {
      res.json({ error_code: 1, err_desc: "No file passed" });
      return;
    }
    if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'vcf') {
      // exceltojson = vcftojson;
    }
    else {
      // exceltojson = vcftojson;
    }
    console.log("filerequest", req.file.path);
    //console.log('run for csv');


    // vCard = vCard();
    vcard.parseVcardFile(req.file.path,
      function (err, data) {


        // console.log('this', data)
        if (err) console.log('oops:' + err);
        else {

       //   console.log('should be good to go:\n' + JSON.stringify(data.length));


        
        //console.log('this', data)





        var csv = json2csv({ data: data });


        var filepath="uploads/vcftocsv/file.csv";

        fs.writeFile(filepath, csv, function (err) {

          if (err) 
          {
            console.log('throw err;', err);
          }
          else 
          {
            console.log('file saved successfully');
            res.json({ 'csv': csv ,'path':filepath});
          
          }
        });
        }
      });
      
  });

}