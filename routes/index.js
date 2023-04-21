const router = require('express').Router();
const notesRouter = require('./notesRoute');
const apiRouter = require('./apiRoutes');
const path = require('path');

router.use('/notes', notesRouter);
router.use('/api', apiRouter);

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'..','public','index.html'))
})
module.exports = router;