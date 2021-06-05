const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = Schema(
    {
        note : String,
        desc : String,
        title: { type:Schema.Types.ObjectId, ref:'CustomTitles' }

    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model('Note', NoteSchema);