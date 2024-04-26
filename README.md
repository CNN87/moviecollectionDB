Movie-Collection-DB application: An application in which users can search, display and save movies. 
The frontend enables the display of movies through a tile overview with lightbox feature. The backend processes the data and stores it in the CouchDB.
Frontend:
Users can do the following in the frontend
- The films are loaded and rendered from the CouchDb via a tile view.
- The tiles contain the image, the movie title and the genre.
- A navigation bar is displayed at the top where you can initially only search for the movie title
- Clicking on a movie tile opens a lightbox containing the following;
o The picture, the title, the year of release, running time, genre
o Short summary of the movie
o Actors and the director 
Backend:
In the backend, new films are to be added to the collection via a form, which are then saved in the CouchDB. The input fields contain the following:
- Title, year of release, running time, genre, actor, director, 
- a text area for the movie description,
- a file upload for the movie poster/image
Below the form is a list of the films entered from CouchDB.
Here the user has the option of removing existing films.
