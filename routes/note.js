const express = require('express');
const router = express.Router();

const {createNote,getAllNotes,getNoteById,updateNote,deleteNote,getEditNote,getAddNotePage,handleSearch} = require('../controllers/note');
const { checkForAuthentication, checkForAuthorization } = require('../middleware/checkAuthentication');

//create a new Note
router.post('/' , createNote);

//go to add a note page
router.get('/add', getAddNotePage);

//to get all the notes
router.get('/', checkForAuthentication('token'), getAllNotes);

//to get a single note by id
router.get('/:id', getNoteById);

//to update a note by id
router.put('/:id', updateNote);

//to delete a partiuclar note 
router.delete('/:id', checkForAuthorization ,deleteNote)

//to get the note that we want update 
router.get('/edit/:id',checkForAuthorization, getEditNote);

//to handle the search requests
router.get('/search/:key', handleSearch);

module.exports = router;