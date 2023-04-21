const router = require('express').Router();
const path = require('path');

router.get('/', (req,res) => {
    console.log("you are notes request");
    res.sendFile(path.join(__dirname,'..','..','public','notes.html'));
});


module.exports = router;