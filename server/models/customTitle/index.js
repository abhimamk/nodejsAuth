const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var customTitleSchema = new Schema(
    {
        title: { type: String, required: true, unique: true }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }, { strict: false }
);

customTitleSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('CustomTitles', customTitleSchema);