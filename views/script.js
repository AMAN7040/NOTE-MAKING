
document.addEventListener('DOMContentLoaded', () => {
    fetchAllNotes(); // fetch all notes when the page loads
});


//function to fetch all notes from the server
async function fetchAllNotes(){
    try{
        console.log('Fetching notes...');
        const response  = await fetch(`/note`);
        if(!response.ok){
            throw new Error('Failed to fetch notes')
        }
        const notes = await response.json();
        displayNotes(notes);
    }catch(err){
        console.error('Error fetching the notes', err);
    }
}

//Function to display the notes in the page
function displayNotes(notes){
    const allNotes = document.querySelector('.allNotes');
    allNotes.innerHTML = '';
    let html = ''; // Initialize html variable
    notes.forEach(note => {
        html += `<div class="card mx-2 my-2" style="width: 18rem; height: 200px; overflow: hidden;">
                   <div class="card-header">
                      <h5 class="card-title">${note.title}</h5>
                   </div>
                   <div class="card-body">
                   <a href="/note/${note._id}" <button type="submit" class="btn btn-primary">View</button></a>
                   <button type="submit" class="btn btn-primary" onclick="updateNote('${note._id}')">Edit</button>
                   <button type="submit" class="btn btn-primary" onclick="deleteNote('${note._id}')">Delete</button>
                   <hr>
                   <p class="card-text">${note.content}</p>
                   </div>
                 </div>`
    });
    
    if(notes.length != 0){
        allNotes.innerHTML = html;
      }
      else{
        allNotes.innerHTML = "You haven not added any note here please Add a note"
      }
}

//Function to delte the note
async function deleteNote(noteId){
    try{
        const response = await fetch(`/note/${noteId}`,{
            method: 'DELETE',
        });
        if(!response.ok){
            throw new Error("Failed to delete the note");
        }
        await fetchAllNotes()
    }catch(err){
        console.error('Error deleting the note',err);
    }
}

// function to render the edit page
function updateNote(noteId){
    
    window.location.href = `/note/edit/${noteId}`;
}

// Function to perform the search
async function performSearch(searchTerm) {
    try {
        const response = await fetch(`/note/search/${searchTerm}`);
        if (!response.ok) {
            throw new Error('Failed to perform search');
        }
        const data = await response.json();
        displayNotes(data);
    } catch (err) {
        console.error('Error searching notes:', err);
    }
}

//event listener for search input
const searchInput = document.getElementById('find');


searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    if (searchTerm.length > 0) {
        performSearch(searchTerm); // Pass searchTerm to performSearch
    } else {
        fetchAllNotes(); // If input is empty, fetch all notes
    }
});

