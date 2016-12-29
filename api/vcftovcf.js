var vcard = require('vcard-json');
var fs = require('fs');
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var vcard = require('vcard-json');
var vCard = require('vcards-js');

exports.vcftovcf = function (req, res) 
{
 // console.log("file-data",req.file);

  var storage = multer.diskStorage({ //multers disk storage settings
       
    });

    var upload = multer({ //multer settings
        storage: storage,
        fileFilter: function (req, file, callback) { //file filter
            if (['vcf'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) 
            {
                return callback(new Error('Wrong extension type'));
            }
            callback(null, true);
        }
    }).single('file');


    upload(req, res, function (err) 
    {
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
        else 
        
        {
          // exceltojson = vcftojson;
        }
        console.log("filerequest",req.file.path);
    
  
    vCard = vCard();
    vcard.parseVcardFile(req.file.path, function(err, data)
    {
        if(err) console.log('oops:'+ err);
        else 
        {
            console.log('should be good to go:\n'+ JSON.stringify(data));   
            console.log("json data",data); 
            var fs = require('fs');
            var json2xls = require('json2xls');
        
            for (var i = 0; i < data.length; i++) 
            {
                var    firstname = data[i].fullname;
                var   bday= data[i].bday;
            
            // mobile: data[i].phone[0].value,
                var  email= data[i].email;

                vCard.firstName = firstname;
                vCard.bday = bday;
                vCard.email = email;
        
                var saveto=('uploads/vcfTovcf/'+firstname+'.vcf');
                    vCard.saveToFile(saveto);
                    console.log('file save at ',saveto);
            }
        }
    });
  });
}