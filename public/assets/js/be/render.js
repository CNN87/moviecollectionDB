'use strict';

import { elements } from './settings.js';
import ajax from './ajax.js';

const render = {
    overview(contents) {
        elements.contents.innerHTML = '';

        contents.forEach(content => {
            const container = document.createElement('div');
            container.className = 'container';
            elements.contents.append(container);

            if (content.image) {
                const imageContainer = document.createElement('div');
                imageContainer.className = 'movieListImg';
                const elMovieImg = document.createElement('img');
                elMovieImg.src = `/uploads/${content.image.newFilename}`;
                imageContainer.appendChild(elMovieImg);
                container.appendChild(imageContainer);
            }

            const movieContentWithButton = document.createElement('div');
            movieContentWithButton.className = 'movieContent';
            container.append(movieContentWithButton);

            //filminfos
            const elMovieInfo = document.createElement('div');
            elMovieInfo.className = 'movieInfo';
            movieContentWithButton.append(elMovieInfo);

            const elMovieInfoHeader = document.createElement('div');
            elMovieInfoHeader.className = 'movieInfoHeader';
            elMovieInfo.append(elMovieInfoHeader);

            const elTitle = document.createElement('h3');
            elTitle.innerHTML = content.title;
            elMovieInfoHeader.append(elTitle);

            const elRelease = document.createElement('h3');
            elRelease.innerHTML = `(${content.release})`;
            elMovieInfoHeader.append(elRelease);

            const elGenre = document.createElement('span');
            elGenre.innerHTML = `Genre: ${content.genre}` ;
            elMovieInfo.append(elGenre);

            const elDuration = document.createElement('span');
            elDuration.innerHTML =  `Dauer: ${content.duration} min` ;
            elMovieInfo.append(elDuration);

            //Button film entfernen
            const btnRemove = document.createElement('button');
            btnRemove.innerHTML = 'Movie Entfernen';
            movieContentWithButton.append(btnRemove);

            btnRemove.addEventListener(
                'click',
                () => ajax.removeContent(content)
            )
        })
    }
}

export default render;