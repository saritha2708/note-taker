const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('../../../helpers/uuid');

router.get('/', (req,res) => {
    fs.readFile(path.join(__dirname,'..','..','..','db','db.json'), 'utf-8', (err, notes) => {
        if(err) {
          console.log('i am in error');
          return res.status(500).json({ err });
        }  
        console.log('i am not in error');
        res.json(JSON.parse(notes));
    });
});

router.post('/', (req,res) => {
    const { title, text } = req.body;
    if(title && text) {
        fs.readFile(path.join(__dirname,'..','..','..','db','db.join'), 'utf-8', (err, notes) => {
            //check for errors
            if(err) {
              return res.status(500).json({ err });
            }  
            const data = JSON.parse(notes);
             //add data to the array from db.json file
            data.push({
                title,
                text,
                id: uuid()
            });

            fs.writeFile('./db/users.json', JSON.stringify(data, null, 2), (err) => {
                if(err) {
                    return res.status(500).json({err});
                }

                res.json({ title, text });
            });

        });  
    }else {
        res.status(400).json({error: 'Title and Text are required'});
    }
});

router.delete('/:id', (req, res) => {
    const deleteId = req.params.id;
    if(title && text) {
        fs.readFile(path.join(__dirname,'..','..','..','db','db.join'), 'utf-8', (err, notes) => {
            //check for errors
            if(err) {
              return res.status(500).json({ err });
            }  
            const data = JSON.parse(notes);
             //add data to the array from db.json file
            data.push({
                title,
                text,
            });

            fs.writeFile('./db/users.json', JSON.stringify(data, null, 2), (err) => {
                if(err) {
                    return res.status(500).json({err});
                }

                res.json({ title, text });
            });

        });  
    }else {
        res.status(400).json({error: 'Title and Text are required'});
    }    
});

module.exports = router;