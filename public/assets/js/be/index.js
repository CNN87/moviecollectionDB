'use strict';

// IMPORTS
import ajax from './ajax.js';
import { elements } from './settings.js';
import render from './render.js';

// KONSTANTEN / VARIABLEN

// FUNKTIONEN
const domMapping = () => {
    elements.formCreateContent = document.querySelector('#formCreateContent');
    elements.contents = document.querySelector('#contents');
}

const appendEventlisteners = () => {
    elements.formCreateContent.addEventListener('submit', ajax.saveContent);
}

const init = () => {
    domMapping();
    appendEventlisteners();

    ajax.loadContents().then(
        render.overview
    ).catch(
        console.warn
    )
}

// INIT
init();