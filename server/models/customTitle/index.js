const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customTitleSchema = new Schema(
    {
        title: { type: String, required: true, unique: true }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }, { strict: false }
);

module.exports = mongoose.model('CustomTitles', customTitleSchema);