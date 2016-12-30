var vcard = require('vcard-json');
var fs = require('fs');
var json2xls = require('json2xls');
var multer = require('multer');
var vCard = require('vcards-js');
var FileSaver = require('file-saver');


exports.vcftoexcel = function (req, res) 
{
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


      console.log('file is', req.file);
        if (err) {
            res.json({ error_code: 1, err_desc: err });
           
        }
        if (!req.file) {
            res.json({ error_code: 1, err_desc: "No file passed" });
           
        }
        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'vcf') {
          // exceltojson = vcftojson;
        }
        else 
        
        {
          // exceltojson = vcftojson;
        }
        console.log("filerequest",req.file.path);
    

     // vcard.parseVcardFile('./sampleexcel/suraj.vcf', 
     vCard = vCard();
    vcard.parseVcardFile(req.file.path,
      function(err, data){

        
       // console.log('this', data)
      if(err) console.log('oops:'+ err);
      else {

    console.log('should be good to go:\n'+ JSON.stringify(data.length));    
     res.json({data: data,'path': 'uploads/Vcftoexcel/data.xlsx'});
 
   // console.log('this', data)

    var fs = require('fs');
    var json2xls = require('json2xls');

    var ContactData=[];
    
    for(var i=0;i<data.length;i++)
    {
      
          if(data[i].email[0])
          {
              var email=data[i].email[0].value;
          }
          else
          {
              var email="";
          }

          if(data[i].phone[0])
          {
              var Cellphone=data[i].phone[0].value;
              //console.log('phone', Cellphone);
          }
         
          else
          {
              var Cellphone="";

          }
           if(data[i].phone[1])
          {
              var Workphone=data[i].phone[1].value;
              //console.log('phone',Workphone);
          }
         
          else
          {
              var Workphone="";

          }
          if(data[i].phone[2])
          {
              var Otherphone=data[i].phone[2].value;
              //console.log('phone',Workphone);
          }
         
          else
          {
              var Otherphone="";

          }
          
           //console.log('phone', phone);

          if(data[i].addr[0])
          {
              var homeAddress = data[i].addr[0].street+ ' ' + data[i].addr[0].city+ ' ' + data[i].addr[0].state+ ' '+ data[i].addr[0].zip+ ' ' + data[i].addr[0].country;
               
             // var homeAddress = 
          }
          else
          {
             var homeAddress = "";
            

          }
       
         if(data[i].addr[1])
          {
             
               var workAddress = data[i].addr[1].street+ ' ' + data[i].addr[1].city+ ' ' + data[i].addr[1].state+ ' '+ data[i].addr[1].zip+ ' ' + data[i].addr[1].country;
             // var homeAddress = 
          }
          else
          {
             var workAddress = "";
          }
        ContactData.push({
             
                          // vCard: vCard();
                        firstName: data[i].fullname, 
                      //  middleName: data[i].middleName,
                       // lastName: data[i].middleName,
                       
                        //vCard.organization = 'ACME Corporation';
                        
                        
                       // workPhone: data[i].workPhone, 
                        birthday: data[i].bday,
                       // title: data[i].workPhone,
                       /* url: data[i].url,
                        workUrl: data[i].url,
                        note: data[i].url,
                        
                        nickname: data[i].nickname,
                        namePrefix: data[i].namePrefix,
                        nameSuffix: data[i].nameSuffix,
                        gender: data[i].gender,
                        anniversary: data[i].anniversary,
                        role: data[i].role,
                        */
                        
                        //set other phone numbers 
                       // homePhone: data[i].homePhone, 
                        Cellphone: Cellphone,
                        Workphone: Workphone,
                        Otherphone: Otherphone,
                         
                        //pagerPhone: data[i].pagerPhone, 
                      /*  
                        homeFax : data[i].homeFax, 
                        workFax:  data[i].workFax, 
                        */
                        // set email addresses 
                        
                        email: email,
                        workEmail: data[i].workemail,
                        
                      
                        //set address information 
                         homeAddress: homeAddress,
                         workAddress: workAddress,
                       
                        /*
                        //set social media URLs 
                        socialUrls['facebook'] = 'https://...';
                        socialUrls['linkedIn'] = 'https://...';
                        socialUrls['twitter'] = 'https://...';
                        socialUrls['flickr'] = 'https://...';
                        socialUrls['custom'] = 'https://...';
                       */
                        
        });
      }

    var xls = json2xls(ContactData);

    fs.writeFileSync('uploads/Vcftoexcel/data.xlsx', xls, 'binary');

      }
    });
  
     

});

}


