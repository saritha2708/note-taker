const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('../../../helpers/uuid');

// get request to route "http://localhost:3001/api/notes"
router.get('/', (req,res) => {
    fs.readFile(path.join(__dirname,'..','..','..','db','db.json'), 'utf-8', (err, notes) => {
        if(err) {
          return res.status(500).json({ err });
        }  
        res.json(JSON.parse(notes));
    });
});

// post request to route "http://localhost:3001/api/notes"
router.post('/', (req,res) => {
    const { title, text } = req.body;

    if(title && text) {
        fs.readFile(path.join(__dirname,'..','..','..','db','db.json'), 'utf-8', (err, notes) => {
            //check for errors
            if(err) {
              return res.status(500).json({ err });
            }  
            const data = JSON.parse(notes);
             //add note to the array from db.json file
            data.push({
                title,
                text,
                id: uuid()
            });

            // write the updated array to the db.json file
            fs.writeFile(path.join(__dirname,'..','..','..','db','db.json'), JSON.stringify(data, null, 2), (err) => {
                if(err) {
                    return res.status(500).json({err});
                }

                res.send({ title, text });
            });

        });  
    }else {
        res.status(400).json({error: 'Title and Text are required'});
    }
});

// delete request to route "http://localhost:3001/api/notes/:id"
router.delete('/:id', (req, res) => {
    const deleteId = req.params.id;
    if(deleteId) {
        fs.readFile(path.join(__dirname,'..','..','..','db','db.json'), 'utf-8', (err, notes) => {
            //check for errors
            if(err) {
              return res.status(500).json({ err });
            }  
            let data = JSON.parse(notes);
            // filter the array without the note matching the delete request id
            data = data.filter(element => element.id !== deleteId)
            
            // write the filtered array to the db.json file
            fs.writeFile(path.join(__dirname,'..','..','..','db','db.json'), JSON.stringify(data, null, 2), (err) => {
                if(err) {
                    return res.status(500).json({err});
                }

                res.json(`Successfully deleted the note with id: ${deleteId}`);
            });

        });  
    }else {
        res.status(400).json({error: 'Valid id is required!'});
    }    
});

module.exports = router;