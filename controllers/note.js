const Note = require('../models/note');

//controller function to create a note
async function createNote(req,res){
    try{
     const {title,content} = req.body;
     const newNote = new Note({
        title,
        content, 
        createdBy: req.user._id,
     });
     const savedNote = await newNote.save();
     res.status(201).json(savedNote);
    }catch(err){
        res.status(400).json({message: err.message});
    }
}

//controller function  to go to add note page
async function getAddNotePage(req,res){
    res.render('addnote', { 
        user: req.user});
}

// controller function To get all the notes
async function getAllNotes(req,res){
    try{
         if(!req.user) throw new Error('User ID not found');
        // Fetch notes where createdBy matches the user's ID
        const notes = await Note.find({ createdBy: req.user._id });
        res.json(notes);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

//controller function to get a single note by id
async function getNoteById(req,res){
    try{
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message: "Note not found"});
        }

        res.render('note', { 
            user: req.user,
            note: note });

    }catch(err){
        res.status(500).json({message: err.message});
    }
}

//controller function to update a note by ID
async function updateNote(req,res){
    try{
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new:true});
        if(!updatedNote){
            return res.status(404).json({message: "Note not found"});
        }
        res.json(updatedNote);
    }catch(err){
        res.staus(400).json({message: err.message});
    }
}

//controller function to delete a note by Id
async function deleteNote(req,res){
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote){
            return res.status(404).json({message: "Note not found"});
        }
        res.json({message: 'note deleted successfully'});
    }catch(err){
        res.staus(400).json({message: err.message});
    }
}

async function getEditNote(req,res){
    try{
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        if(!noteId){
            return res.status(404).json({message: "Note not found"});
        }
        res.render('edit',{note});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

async function handleSearch(req,res){
    const searchTerm = req.params.key
    try {
        const notes = await Note.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in the title
                { content: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in the content
            ]
        });

        res.json(notes);
    } catch (err) {
        console.error('Error searching notes:', err);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,
    getEditNote,
    getAddNotePage,
    handleSearch,
};

