'use strict';

const render = {
    contents: (contents) => {
        const filmContainer = document.querySelector('.filmContainer'); 
        filmContainer.innerHTML = ''; 

        if (contents.length === 0) {
            // Wenn keine Filme gefunden wurden, render den entsprechenden Text
            const noMatchText = document.createElement('h3');
            noMatchText.className = 'noMatchText';
            noMatchText.textContent = 'Keine Übereinstimmung gefunden.';
            filmContainer.appendChild(noMatchText);
        } else {
            // Inhalte iterieren
            contents.forEach(content => {
                const card = document.createElement('div');
                card.className = 'card filmTitle';
                filmContainer.appendChild(card);

                // Bild
                if (content.image) {
                    const elMovieImg = document.createElement('img');
                    elMovieImg.src = `/uploads/${content.image.newFilename}`;
                    elMovieImg.className = 'cardImgTop';
                    elMovieImg.alt = content.title;
                    card.appendChild(elMovieImg);
                }

                // Körper der Karte (card body)
                const cardBody = document.createElement('div');
                cardBody.className = 'cardBody';
                card.appendChild(cardBody);

                // Filmtitel
                const elTitle = document.createElement('h5');
                elTitle.className = 'cardTitle';
                elTitle.innerHTML = content.title;
                cardBody.appendChild(elTitle);

                // Genres
                if (content.genre && content.genre.length > 0) {
                    const genreContainer = document.createElement('div'); 
                    genreContainer.className = 'genreContainer'; 
                    
                    const allGenres = content.genre.join(', '); 
                    const individualGenres = allGenres.split(', ');

                    individualGenres.forEach(genre => {
                        const genreSpan = document.createElement('span');
                        genreSpan.className = 'genre';
                        genreSpan.textContent = genre;
                        genreContainer.appendChild(genreSpan); 
                    });

                    cardBody.appendChild(genreContainer);
                }

                // Event-Listener für Klick auf die Kachel hinzufügen
                card.addEventListener('click', () => openFilmDetails(content));
            });
        }
    },
};

// Funktion zum Öffnen der Lightbox mit den Filminformationen
const openFilmDetails = (content) => {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);

    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightboxContent';
    lightbox.appendChild(lightboxContent);

    const filmContainer = document.createElement('div');
    filmContainer.className = 'lbFilmContainer';
    lightboxContent.appendChild(filmContainer);

    // Bild links
    if (content.image) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'film-image';
        const elMovieImg = document.createElement('img');
        elMovieImg.src = `/uploads/${content.image.newFilename}`;
        elMovieImg.alt = content.title;
        imageContainer.appendChild(elMovieImg);
        filmContainer.appendChild(imageContainer);
    }

    // Filminformationen rechts
    const filmInfoContainer = document.createElement('div');
    filmInfoContainer.className = 'film-info';
    
    const titleElement = document.createElement('h2');
    titleElement.textContent = `${content.title} (${content.release})`;
    filmInfoContainer.appendChild(titleElement);

    const moviedescElement = document.createElement('p');
    moviedescElement.textContent = content.moviedesc;
    filmInfoContainer.appendChild(moviedescElement);

    const durationElement = document.createElement('p');
    durationElement.textContent = `Duration: ${content.duration} min`;
    filmInfoContainer.appendChild(durationElement);

    const releaseElement = document.createElement('p');
    releaseElement.textContent = `Release: ${content.release}`;
    filmInfoContainer.appendChild(releaseElement);

    const genreElement = document.createElement('p');
    genreElement.textContent = `Genre: ${content.genre}`;
    filmInfoContainer.appendChild(genreElement);

    const directorElement = document.createElement('p');
    directorElement.textContent = `Director: ${content.director}`;
    filmInfoContainer.appendChild(directorElement);

    const castElement = document.createElement('p');
    castElement.textContent = `Cast: ${content.cast}`;
    filmInfoContainer.appendChild(castElement);

    filmContainer.appendChild(filmInfoContainer);

    const closeButton = document.createElement('span');
    closeButton.className = 'lightboxClose';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(lightbox);
    });
    lightboxContent.appendChild(closeButton);

    lightbox.style.display = 'block';

    
};

export default render;
