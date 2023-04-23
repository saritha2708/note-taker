const router = require('express').Router();
const path = require('path');

// get request for http://localhost:3001/notes
router.get('/', (req,res) => {
    console.log("you are notes request");
    res.sendFile(path.join(__dirname,'..','..','public','notes.html'));
});


module.exports = router;