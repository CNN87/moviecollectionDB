'use strict';

const ajax = {
    loadJSON(url) {
        return fetch(url).then(
            res => res.json()
        ).then(
            res => {
                if (res.status == 'ok') return res.payload
                
                // Die throw()-Funktion erzeugt mit Absicht einen Programmfehler, 
                // der im Falle eines Promise zum Aufrufen der catch()-Methode führt
                else throw(res.err)
            }
        )
    }
}

export default ajax;