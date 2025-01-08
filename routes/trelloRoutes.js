module.exports = app => {
    const trelloController = require("../controller/trelloController.js");
    var router = require("express").Router();


    router.get("/getCards", trelloController.getCardsExtractCSV);
    
  
    app.use('/api/trello', router);
  };