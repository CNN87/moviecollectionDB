'use strict';

import { elements } from './settings.js';
import render from './render.js';

const ajax = {
    saveContent(evt) {
        evt.preventDefault();

        // Daten zusammentragen und senden
        let content = new FormData(elements.formCreateContent);

        // Dateien zur FormData hinzufügen
        const imageInput = document.querySelector('input[name="imagesrc"]');
        if (imageInput && imageInput.files.length > 0) {
            content.append('imagesrc', imageInput.files[0]);
        }

        fetch('/save_content', {
            method: 'post',
            body: content
        }).then(
            res => res.json()
        ).then(
            ajax.loadContents
        ).then(
            render.overview
        ).then(
            () => {
                elements.formCreateContent.reset();
            }
        ).catch(
            console.error
        )
    },
    loadContents() {
        return fetch('/load_data').then(
            res => res.json()
        ).then(
            res => {
                if (res.status == 'ok') return res.payload

                // Die throw()-Funktion erzeugt mit Absicht einen Programmfehler, 
                // der im Falle eines Promise zum Aufrufen der catch()-Methode führt
                else throw (res.err)
            }
        )
    },
    removeContent(content){
        return fetch('/remove_content', {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(content)
        }).then(
            ajax.loadContents
        ).then(
            render.overview
        ).catch(
            console.error
        )
    }
}

export default ajax;