
const axios = require("axios");
const csvjson = require('csvjson');
const fs = require('fs');
var json2csv = require('json2csv');
const dotenv = require('dotenv');
const {google} = require('googleapis');
dotenv.config()
var newLine = '\r\n';
const FILE_NAME = process.env.FILE_NAME
const TRELLO_API_KEY = process.env.TRELLO_API_KEY
const TRELLO_API_TOKEN = process.env.TRELLO_API_TOKEN
const CLIENT_EMAIL ="firebase-adminsdk-je7ce@talkpushexam.iam.gserviceaccount.com"
// const PRIVATE_KEY =process.env.PRIVATE_KEY.split(String.raw`\n`).join('\n')
const PRIVATE_KEY ="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1XtTyFnPfqXaq\n83N9+EZnvzYVxAqEqGP1YvIg0YrEImBFOvHdbCrikfYbgjnZtpzx84ssnadVZQM+\n36BBCdLEBRBmx09tzkgJJBWnP455P0UjT1rSp/rCnkZIRpqaA1LxS1ernrtSAPRc\nQNPJCXa33tmhPJX/SldJvDx1CanQ4l/J8eLYwJ7DxQ0kG7YqngvzNhk2++bnWnIa\nBs8FNPjv1ql/5JdSlSmdBm3y3vv4cbrIyXn3jouZ4XSIXCRrNBpptnk+eiLRIAf2\n0xJwAreUuh0L6ZaI6vpCXpbM65jsyLG5FERhYvXh1PajMlANr2tx2UKFQIaHGIFF\nQQX/UV4NAgMBAAECggEAJe9RU9c9YjUUNHpaGClzNGTqf4/y8T81NRB+ez3Iq/BS\nuXg0OW9T4vLLioJo7jADUJnzbKAG7VYE4UQtxRy0YDp87TpX0yw3pe3Nt58UAikp\nIVMKOJBY4xbutVRLJtZ2JTDwg91d6a94bMlEYsKfeaLbWx2MdAqNCkecT5B3W9B7\nOlughnWm8atAay/JyJZ0Xt2AhgTdXxFJa8hThymMKNx6mDtvp+OaAUBOkCQeBHAD\nn1rZfl5buyPgEf5AIfrYEWqpMsaehzXiOJnT0WzqlfwHNpZJcENI++W3kyAuVE0j\nYk604ubQuVyIdC/Cp/OkQDxHwuHYyEVGPxZE1vVF8QKBgQDaETZbEOR4IRFKrUPE\neQ5LzjBm99xz8Md9GZLLB6fKSMyBf2JeA7MoMd5nPH06114VOf5Wupm2+zGIhhVd\nvRH22zjnU9NrYBkfaHLmVeF3A/b3lKbO0UX7nXMZdl19F2jfk5/DQsqVa1HNPv9h\nEX2sOZ6qk5KcCntyGOHy/gnA5QKBgQDU63fl1LlvKE5UQkRZVn5MeCt2BpVofL0j\nBJXU9JOJDhAPBN5ylMEB12719gtucMtVHR+Eqo8GvJg8p2chN3n2IcYWHX2O+7wO\ngYHPIPE1TkYgSl0tlYwmsPivRWWCFZxWMgDsxlalBNYt9oCEJUj8Ptbt+x42DBvZ\nhSDbWLfeCQKBgHJpj3xOK6D/sIPezmx6G08Ymnqb1zWZggEX9tXBaX6PnYTgIesz\nw772EztVGFtT/g/jApfchaPkvYNk3jb1aUR8lqmAaK+wlt3MvmQtcQMxuFUD0FU4\npaAzZt1YJgroymRrnuoi1Al7akrmn7T9KVPAU4gpr0Vhlo0xkvMb6GAlAoGBAJI+\nYY30/KEC2Do7geKy6/DuITvh7cFk3CwvPBKXIrbid9k5COk+jwsKw+Yg510mECMX\n68wdsjt4UkBm4wkHp7eNHxeVjeYltddo0JZKFCL+7l/DdBiZPTheGZGZYs1ktorl\nsYjv+hdCKTJMu50IVwcaylmPQALzcjWHoTfHyhKxAoGADRfN8BqFdj+M5qr3Fgz6\nDLEmXIgy/TbfHY3gNdD9124LhxRrtLhgVhZIuQ3y3+0sAytXu2SCq/flTpjByAaX\nOgIUDgRezZw1NEz++jVFMKhPKiQTontPQqBKThCrOeE8tdxNux1MlX/vYujpq+EK\ndkCkf/n6kdrCjyLrA2Xe9Ic=\n-----END PRIVATE KEY-----\n"
const NodeCache = require('node-cache');


exports.GsheetInsert = async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile:'./talkpushexam-217be1ac375f.json',
    scopes:["https://www.googleapis.com/auth/spreadsheets"]
    })

    const client = auth.getClient()
    const sheets = google.sheets({version:"v4",auth})

    const spreadsheetId = "1Xiq4ct1Uvzf2-GhePWAL70D66ADqeiZbyEIbBalcg8Y"
    // const range = "Sheet1"
    const range = "Sheet1"
 
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,range
    })
    // const rows = response.data.values
    const values = req.body.values

    console.log(values,"Data GSheets")

    // const values = valuesTO
    const resource = {values}
    
    try{
     
      sheets.spreadsheets.values.update({
        // auth,
        spreadsheetId,
        range: `Sheet1`,
        valueInputOption:"USER_ENTERED",
        resource
      })
      // res.status(200).send("Data inserted successfully")
      res.end("Data inserted successfully")
    }catch(err){
      console.error("Error inserting Data: ",err);
      res.status(500).send("Error")
    }

    // res.end("Data inserted successfully")
}


exports.getAllCards = async (req, res) => {
  function createCSVFile(){
    fs.stat(FILE_NAME+'.csv', function (err, stat) {
      if (err == null) {
        console.log('File exists');
      } else {
        //write the headers and newline
        var fields = ['id','Card Name', 'Old List Name', 'New List Name', 'Timestamp of Movement'];
        console.log('New file, just writing headers');
        fields = fields + newLine;
     
        fs.writeFile(FILE_NAME+'.csv', fields, function (err) {
          if (err) throw err;
          console.log('file saved');
   
        });
      }
    });
  }
  async function getAllBoards(url) {
    try {
      const response =  await axios.get(url);
      return response.data; // Return the data from the API response
    } catch (error) {
      console.error('Error fetching API data:', error.message);
      throw error; // Rethrow the error to handle it in the calling code
    }
  }

  
  async function getAllCards(boards_ids) {
    var card_ids = [];
    for (const x of boards_ids) {
      const furl = "https://api.trello.com/1/boards/"+x+"/cards?key="+TRELLO_API_KEY+"&token="+TRELLO_API_TOKEN
      try {
        const response =  await axios.get(furl);
        const numbers = response.data;
        
        numbers.forEach(function(numbers) {  
          card_ids.push(numbers.shortLink)
        });

        ; // Return the data from the API response
      } catch (error) {
        console.error('Error fetching API data:', error.message);
        throw error; // Rethrow the error to handle it in the calling code
      }
    }
    return card_ids
  }

  async function getAllCardsValue(AllCards) {
    var obje = []

    for (const x of AllCards) {
      const furl = "https://api.trello.com/1/cards/"+x+"/actions?key="+TRELLO_API_KEY+"&token="+TRELLO_API_TOKEN
      try {
        const response =  await axios.get(furl);
        const numbers = response.data;
        // console.log(numbers,"x")
        if (response.data.length < 1){

          const aurl = "https://api.trello.com/1/cards/"+x+"/list?key="+TRELLO_API_KEY+"&token="+TRELLO_API_TOKEN
          const responseA =  await axios.get(aurl);
          const list = responseA.data;

          // console.log(list,"list")
          const burl = "https://api.trello.com/1/cards/"+x+"?key="+TRELLO_API_KEY+"&token="+TRELLO_API_TOKEN
          const response =  await axios.get(burl);
          const blankCards = response.data;
          // console.log(blankCards,"blank")

          let my_object = {}
          my_object.shortLink = response.data.shortLink
          my_object.name = response.data.name
          my_object.listBefore = responseA.data.name
          my_object.listAfter = ""
          my_object.date = ""
          obje.push(my_object)
          // console.log(my_object)
        }
        else{
          let my_object = {}
          my_object.shortLink = response.data[0]["data"]["card"]["shortLink"]
          my_object.name = response.data[0]["data"]["card"]["name"]
          my_object.listBefore = response.data[0]["data"]["listBefore"]["name"]
          my_object.listAfter = response.data[0]["data"]["listAfter"]["name"]
          my_object.date = response.data[0]["date"]
          obje.push(my_object)
        }

        
      } catch (error) {
        console.error('Error fetching API data:', error.message);
        throw error; // Rethrow the error to handle it in the calling code
      }
    }
    return obje
  }

    
  async function DataToCsv(my_object){

    if (my_object.length !== 0){
      const jsonData = my_object
    function jsonToCsv(jsonData) {
      let csv = '';
      const headers = Object.keys(jsonData[0]);
      jsonData.forEach(obj => {
          const values = headers.map(header => obj[header]);
          csv += values.join(',') + '\n' ;
      });
      
      return csv;
      }

    const csvData = jsonToCsv(jsonData);

    fs.writeFile(FILE_NAME+'.csv', csvData, function (err) {
      if (err) throw err;
      console.log(csvData+' was appended to file!');
    });
    }
  }

  async function pushDatatoGsheet(AllCardsValue){
    const Data_payload = AllCardsValue
    const valuesTO = []
    
    for (const x of Data_payload) {
      const conv_to_gsheets = Object.keys(x).map(function(_) { return x[_]; })
      valuesTO.push(conv_to_gsheets)
    }
    const auth = new google.auth.GoogleAuth({
      keyFile:'./talkpushexam-217be1ac375f.json',
      scopes:["https://www.googleapis.com/auth/spreadsheets"]
      })
      const client = auth.getClient()
      const sheets = google.sheets({version:"v4",auth})
      const spreadsheetId = "1Xiq4ct1Uvzf2-GhePWAL70D66ADqeiZbyEIbBalcg8Y"
      const values = valuesTO
      const resource = {values}
      
      try{
        console.log(resource,"resource")
        sheets.spreadsheets.values.update({
          // auth,
          spreadsheetId,
          range: `Sheet1!A2`,
          valueInputOption:"USER_ENTERED",
          resource
        })
        res.end("Data inserted successfully")
      }catch(err){
        console.error("Error inserting Data: ",err);
        res.status(500).send("Error")
      }   
  }

  createCSVFile()
  const apiUrl = "https://api.trello.com/1/members/me/boards?key="+TRELLO_API_KEY+"&token="+TRELLO_API_TOKEN
  const data = await getAllBoards(apiUrl);
  const boards = data;
    var boards_ids = [];
    boards.forEach(function(boards) { 
      boards_ids.push(boards.shortLink)
    });
  const AllCards = await getAllCards(boards_ids)
  const AllCardsValue = await getAllCardsValue(AllCards)
  await pushDatatoGsheet(AllCardsValue)
  await DataToCsv(AllCardsValue)
  
}
