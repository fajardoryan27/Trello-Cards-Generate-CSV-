const cache = require('../middleware/cache')

module.exports = app => {
    const trelloController = require("../controller/trelloController.js");
    var router = require("express").Router();


  
    router.post("/insertData", trelloController.GsheetInsert);
    router.get("/getAllCards",cache(86400), trelloController.getAllCards);
    // router.post("/setcache", trelloController.setCardsCache);
    
    
  
    app.use('/api/trello', router);
  };