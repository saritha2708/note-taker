const router = require('express').Router();
const notesRouter = require('./notesRoute');

router.use('/notes', notesRouter);

router.get('/', (req,res) => {
    console.log('you are in api');
    res.send('you are in api');
});


module.exports = router;