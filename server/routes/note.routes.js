module.exports = function(app) {
    const notes = require('../controllers/notes/index');

    // create a new note
    app.post('/api/postNote', notes.create);

    // get all notes
    app.get('/api/getAllNotes', notes.findAll);
}