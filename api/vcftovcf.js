var vcard = require('vcard-json');
var fs = require('fs');
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var vcard = require('vcard-json');
var vCard = require('vcards-js');
var EasyZip = require('easy-zip').EasyZip;
var zip = new EasyZip();
        
var del = require('del');
 


exports.vcftovcf = function (req, res) 
{
    var storage = multer.diskStorage({
        fileFilter: function (req, file, callback) 
        {
            if (file.mimetype !== 'text/x-vcard') 
            {
                return callback(new Error('Wrong extension type'));
            }
            callback(null, true);
        }
    });

    var upload = multer({
        storage: storage,
    }).single('file');
    
    upload(req, res, function (err) 
    {
        if (err) 
        {
            console.log('err',err);
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        if (!req.file) 
        {
            res.json({ error_code: 1, err_desc: "No file passed" });
            return;
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
                var   firstname = data[i].fullname;
                var   bday= data[i].bday;
            
            // mobile: data[i].phone[0].value,
                var  email= data[i].email;

                vCard.firstName = firstname;
                vCard.bday = bday;
                vCard.email = email;
                var saveto=('uploads/vcfTovcf/contacts/'+firstname+'.vcf');
                vCard.saveToFile(saveto);
                console.log('file save at ',saveto);
                
            }

            zip.zipFolder('uploads/vcftovcf/contacts',function()
            {
                zip.writeToFile('uploads/contacts.zip');
            });
            
            del(['uploads/vcfTovcf/contacts/*.vcf', '!tmp/unicorn.js']).then(paths => {
                console.log('Deleted files and folders:\n', paths.join('\n'));
            });
             res.json({ 'path': 'uploads/contacts.zip'});
            
        }
    });
  });
}