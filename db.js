'use strict';

import credentials from './credentials.js';
import nano from 'nano';

let connection;
let dbName = 'moviedb';

const db = {
    saveContent(content) {
        return new Promise((resolve, reject) => {
            let workingDB = connection.use(dbName);

            workingDB.insert(content).then(
                res => resolve(res)
            ).catch(
                err => reject(err)
            )
        })
    },
    loadAll() {
        return new Promise((resolve, reject) => {
            const workingDB = connection.use(dbName);

            workingDB.list({ include_docs: true }).then(
                res => res.rows.map(row => row.doc)
            ).then(
                contents => resolve(contents)
            ).catch(
                err => reject(err)
            )
        })
    },
    removeContent(id,rev){
        return new Promise(resolve => {
            const workingDB = connection.use(dbName);

            workingDB.destroy(id, rev).then(
                () => resolve()
            )
        })
    },
    init() {
        return new Promise(resolve => {
            connection = nano(`http://${credentials.username}:${credentials.password}@127.0.0.1:5984`).db;

            connection.list().then(
                dbList => {
                    // Wenn die Datenbank nicht existiert, lege sie an
                    if (!dbList.includes(dbName)) {
                        return connection.create(dbName)
                    }
                }
            ).then(
                () => console.log('Datenbank steht bereit')
            ).then(
                () => {
                    resolve()
                }
            )
        })
    }
    

}



export default db;