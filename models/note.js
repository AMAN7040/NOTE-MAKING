const {Schema, model} = require('mongoose');

const noteSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,  
    },
    createdBy:{
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
},{timestamps: true});

const Note = model('Note', noteSchema);

module.exports = Note;
