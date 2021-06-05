const Note = require('../../models/notes');

exports.create = function(req, res) {
    // Create and Save a new Note
    if(!req.body) {
        console.log(req.body);
        res.status(400).send({message: "Note can not be empty"});
    } else {
        var note = new Note({note: req.body.note || "Untitled Note", desc: req.body.desc, title: req.body.title});

        note.save(function(err, data) {
            if(err) {
                console.log(err);
                res.status(500).send({message: "Some error occurred while creating the Note."});
            } else {
                res.send(data);
            }
        });
    }


};


exports.findAll = function(req, res) {
    Note.find({})
    .populate('title').then(response => {
        return res.send(response);
    }).catch((error)=>{
       return res.status(500).send({message: "Some error occurred while retrieving notes."});
    })
};