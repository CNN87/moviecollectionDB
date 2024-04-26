'use strict';

// IMPORTS
import render from './render.js';
import ajax from './ajax.js';
import { elements } from './settings.js';

// FUNKTIONEN
const domMapping = () => {
    elements.main = document.querySelector('main');
}

//searchMovies funktion
const searchMovies = (event, contents) => { 
    try {
        event.preventDefault(); 
        const searchTerm = document.querySelector('.searchInput').value.toLowerCase(); 
        const filteredMovies = contents.filter(content => filterPredicate(content, searchTerm));
        render.contents(filteredMovies);
    } catch (error) {
        console.error('Fehler in der Suchfunktion:', error);
    }
};

const filterPredicate = (content, searchTerm) => {
    // Überprüfe, ob der Titel vorhanden ist und ein String ist, bevor die 'toLowerCase()' Methode angewendet wird
    if (Array.isArray(content.title) && content.title.length > 0 && typeof content.title[0] === 'string') {
        return content.title[0].toLowerCase().includes(searchTerm); 
    }
    return false; 
};

const appendEventlisteners = (contents) => {
    // Event-Listener für das Submit-Ereignis
    document.querySelector('.navBarForm').addEventListener('submit', (event) => searchMovies(event, contents));

    // Event-Listener für das Input-Ereignis
    const searchInput = document.querySelector('.searchInput');
    searchInput.addEventListener('input', () => {
        searchMovies(event, contents);
    });
}

// Sortierfunktion: Alphabetisch nach dem Titel
const sortContentsAlphabetically = (contents) => {
    contents.sort((a, b) => {
        const titleA = a.title[0].toLowerCase();
        const titleB = b.title[0].toLowerCase();
        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    });
};

const init = () => {
    domMapping();

    ajax.loadJSON('/load_data').then(
        contents => { 
            sortContentsAlphabetically(contents); 
            appendEventlisteners(contents); 
            render.contents(contents); 
        }
    ).catch(
        console.warn
    )
}

// INIT
init(); 
