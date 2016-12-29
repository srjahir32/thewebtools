var vcard = require('vcard-json');
var fs = require('fs');
var json2xls = require('json2xls');


exports.vcftoexcel = function (req, res) 
{
  vcard.parseVcardFile('./uploads/Alex.vcf',

    function (err, data) 
    {
      if (err)
      { 
        console.log('oops:' + err);
      }
      else 
      {
        console.log('Total Contact Found ' + JSON.stringify(data.length));
        
        var ContactData = [];

        for (var i = 0; i < data.length; i++) 
        {
          //console.log('data',data[i]);
          if(data[i].addr[0])
          {
            var addr=data[i].addr[0].street+' '+data[i].addr[0].city+' '+data[i].addr[0].zip+' '+data[i].addr[0].country;
          }
          else
          {
            var addr="";
          }

           if(data[i].phone[0])
          {
              var Cellphone=data[i].phone[0].value;
          }
         
          else
          {
              var Cellphone="";
          }
           if(data[i].phone[1])
          {
              var Workphone=data[i].phone[1].value;
          }
         
          else
          {
              var Workphone="";
          }

            ContactData.push({
                fullname: data[i].fullname,
                bday: data[i].bday,
                addr: addr,
                Cellphone: Cellphone,
                Workphone:Workphone,
                email: data[i].email
              });
              
        }
        
        var xls = json2xls(ContactData);

        fs.writeFileSync('./uploads/excel/Alex.xlsx', xls, 'binary');

      }
    });
}


