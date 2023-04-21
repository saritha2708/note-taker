const router = require('express').Router();
const notesRouter = require('./notesRoute');

router.use('/notes', notesRouter);

module.exports = router;