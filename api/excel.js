var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var vCard = require('vcards-js');

/*exports.exceltocvf = function (req, res) 
{
     var storage = multer.diskStorage({ //multers disk storage settings
      destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
     }
    });

    var upload = multer({ //multer settings
        storage: storage,
        fileFilter: function (req, file, callback) { //file filter
            if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
                return callback(new Error('Wrong extension type'));
            }
            callback(null, true);
        }
    }).single('file');

 
        var exceltojson;
        upload(req,res,function(err)
        {
            if(err)
            {
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            if(!req.file)
            {
                res.json({error_code:1,err_desc:"No file passed"});
                return;
            }
            if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx')
            {
                exceltojson = xlsxtojson;
            } 
            else 
            {
                exceltojson = xlstojson;
            }
       
            console.log(req.file.path);
       
            try {
                exceltojson({
                    input: req.file.path,
                    output: null, //since we don't need output.json
                    lowerCaseHeaders:true
                }, function(err,result){
                    if(err) 
                    {
                        return res.json({error_code:1,err_desc:err, data: null});
                    }
                    else
                    {
                        
                        var filname=req.file.originalname;
                        console.log('result',result);
                        console.log('req.file',req.file.originalname);
                        res.json({data: result});
       
                    return 0;

                    var title = result[0].title;
                    var firstname = result[0].firstname;
                    var lastname = result[0].lastname;
                    var workPhone = result[0].workPhone;
                    var birthday = result[0].birthday;;

                    var saveto = ('uploads/vcf/' + firstname + '.vcf');

                    vCard = vCard();

                    vCard.firstName = firstname;
                    vCard.middleName = lastname;
                    vCard.lastName = '';


                    vCard.workPhone = workPhone;
                    vCard.birthday = new Date(birthday);
                    vCard.title = title;
                    vCard.gender = 'M';


                    //vCard.saveToFile(saveto);
                    console.log('file save at ', saveto);
                    console.log(vCard.getFormattedString());

                    res.json({ data: result });

                    } 
                    
                });
            } 
            catch (e)
            {
                res.json({error_code:1,err_desc:"Corupted excel file"});
            }
        })
       
   
}*/

exports.exceltovcf = function (req, res)
 {
   

    var storage = multer.diskStorage({ 
        fileFilter: function (req, file, callback) { 
            if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
                return callback(new Error('Wrong extension type'));
            }
            callback(null, true);
        }
    });

    var upload = multer({ 
        storage: storage,

    }).single('file');


    var exceltojson;
    upload(req, res, function (err) {
        if (err)
         {
            res.json({ error_code: 1, err_desc: err });

        }
        if (!req.file)
         {
            res.json({ error_code: 1, err_desc: "No file passed" });

        }
        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson;
        }
        else {
            exceltojson = xlstojson;
            }

        //console.log("selected file path:-", req.file.path);


        exceltojson(
            {
                input: req.file.path,
                output: null,
                return_type: 'File',

            }, function (err, result) {
                if (err) {

                           res.json({ error_code: 1, err_desc: err, data: null });

                         }
                else 
                        {
                            vCard = vCard();
                           
                            for (var i = 0; i < result.length; i++)
                             {

                             // console.log('result', result);

                                 var title = result[i].email;
                                var firstname = result[i].name;
                                var phone = result[i].phone;
                                var lastname = result[i].lname;

                                vCard.title = title;
                                vCard.firstName = firstname;
                                vCard.middleName = lastname;
                                vCard.phone = phone;            
                                
                              
                         

                               /*     var firstname = result[i].fullname;
                                   var bday = result[i].bday;
                                   var addr = result[i].addr;
                                   var Cellphone = result[i].Cellphone;
                                   var Workphone = result[i].Workphone;
                                   var email = result[i].email;
                                   
                                   vCard.firstName = firstname;
                                   vCard.bday=bday;
                                   vCard.addr=addr;
                                   vCard.Cellphone=Cellphone;
                                   vCard.Workphone=Workphone;
                                   vCard.email=email;
                              */
                                   var saveto = ('uploads/Exceltovcf/' + firstname + '.vcf');
                                   vCard.saveToFile(saveto);
                                   console.log('file save at ', saveto);
                                   res.json({ data: result,'path': saveto});
                                   return;
                         }

            
                }

            });

    })


}




exports.getExcelData = function (req, res) 
{
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) 
        {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
        }
    });

    var upload = multer({ //multer settings
        storage: storage,
        fileFilter: function (req, file, callback) { //file filter
            if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
                return callback(new Error('Wrong extension type'));
            }
            callback(null, true);
        }
    }).single('file');

    var exceltojson;

    upload(req, res, function (err) 
    {
        if (err) 
        {
            console.log('err',err);    
            return;
        }
        if (!req.file) 
        {
            console.log('no file passed');
            return;
        }
        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') 
        {
            exceltojson = xlsxtojson;
        }
        else 
        {
            exceltojson = xlstojson;
        }

        try {
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders: true
            }, function (err, result) {
                if (err) {
                    return res.json({ error_code: 1, err_desc: err, data: null });
                }
                else {
                    var filname = req.file.originalname;
                    console.log('result', result);
                    res.json({ data: result });
                }

            });
        }
        catch (e) {
            res.json({ error_code: 1, err_desc: "Corupted excel file" });
        }
    });

}

                