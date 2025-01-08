
const axios = require("axios");
const csvjson = require('csvjson');
const fs = require('fs');
var json2csv = require('json2csv');
const dotenv = require('dotenv');
dotenv.config()
var newLine = '\r\n';
const FILE_NAME = process.env.FILE_NAME
const TRELLO_API_KEY = process.env.TRELLO_API_KEY
const TRELLO_API_TOKEN = process.env.TRELLO_API_TOKEN

exports.getCardsExtractCSV = (req, res) => {

  function createCSVFile(){
    fs.stat(FILE_NAME+'.csv', function (err, stat) {
      if (err == null) {
        console.log('File exists');
      } else {
        //write the headers and newline
        var fields = ['Card Name', 'Old List Name', 'New List Name', 'Timestamp of Movement'];
        console.log('New file, just writing headers');
        fields = fields + newLine;
     
        fs.writeFile(FILE_NAME+'.csv', fields, function (err) {
          if (err) throw err;
          console.log('file saved');
   
        });
      }
    });
  }
  
  function getAllBoards(){
    axios
    .get("https://api.trello.com/1/members/me/boards?key="+TRELLO_API_KEY+"&token="+TRELLO_API_TOKEN)
    .then((response) => 
      processBoards(response)
      // displayOutput(response)
    )
    .catch((err) => console.log(err));
  }

  function processBoards(response){
    const boards = response.data;
    var boards_ids = [];
    boards.forEach(function(boards) { 
      boards_ids.push(boards.shortLink)
  
    });
    getAllCards(boards_ids)

  }

  function getAllCards(boards_ids){

    for (const x of boards_ids) {
      axios
      .get("https://api.trello.com/1/boards/"+x+"/cards?key="+TRELLO_API_KEY+"&token="+TRELLO_API_TOKEN)
      .then((response) => 
        displayOutput(response)
      )
      .catch((err) => console.log(err));
    }
  }

  function displayOutput(response){
    const numbers = response.data;
    var card_ids = [];
    numbers.forEach(function(numbers) {  
      card_ids.push(numbers.shortLink)
    });
    getCardVal(card_ids)

  }
  function getCardVal(card_ids){
    for (const x of card_ids) {
      axios
      .get("https://api.trello.com/1/cards/"+x+"/actions?key="+TRELLO_API_KEY+"&token="+TRELLO_API_TOKEN)
      .then((response) => 
        processValue(response,x)
      )
      .catch((err) => console.log(err));
    }
    
  }
  function processValue(response,x){

    if (response.data.length < 1){
      function processListValue(response){
        var listName= response.data.name
        console.log(listName,x)
        getBlankCardValue(listName,x)
      }
      function processCardAndListValue(response,listName){
        var cardName = response.data.name
        let my_object = {}
        my_object.name = cardName
        my_object.listBefore = listName
        my_object.listAfter = "No movement"
        my_object.date = ""
        DataToCsv(my_object)
      }
      function getBlankCardValue(listName,x){
        axios
        .get("https://api.trello.com/1/cards/"+x+"?key="+TRELLO_API_KEY+"&token="+TRELLO_API_TOKEN)
        .then((response) => 
          processCardAndListValue(response,listName)
        )
        .catch((err) => console.log(err));
      }
      axios
      .get("https://api.trello.com/1/cards/"+x+"/list?key="+TRELLO_API_KEY+"&token="+TRELLO_API_TOKEN)
      .then((response) => 
        processListValue(response)
      )
      .catch((err) => console.log(err));
    }
    else{
      let my_object = {}
      my_object.name = response.data[0]["data"]["card"]["name"]
      my_object.listBefore = response.data[0]["data"]["listBefore"]["name"]
      my_object.listAfter = response.data[0]["data"]["listAfter"]["name"]
      my_object.date = response.data[0]["date"]
      DataToCsv(my_object)
    }
  }

function DataToCsv(my_object){
  const jsonData = [my_object]
    
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

      fs.appendFile(FILE_NAME+'.csv', csvData, function (err) {
        if (err) throw err;
        console.log(csvData+' was appended to file!');
      });
}

createCSVFile()
getAllBoards()
res.status(200).send({
  message: "Sucess"
});
}
