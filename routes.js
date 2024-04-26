'use strict';

import express from 'express';
import formidable from 'formidable';
import db from './db.js';

// VARIABLEN
const filenames = [];

// ROUTEN
const router = express.Router();

router.use(express.json());

router.post('/save_content', (request, response) => {
    const myForm = formidable({
        uploadDir: 'public/uploads',
        keepExtensions: true,
        multiples: true
    });

    myForm.parse(request, (err, fields, files) => {
        if (err) {
            console.warn(err);
            response.status(500).json({ error: 'Internal Server Error' });
        } else {
            const image = files.imagesrc && files.imagesrc[0] ? files.imagesrc[0] : null;

            let content = {
                title: fields.title,
                moviedesc: fields.moviedesc,
                director: fields.director,
                duration: fields.duration,
                release: fields.release,
                cast: fields.cast,
                genre: fields.genre,
                image: image,
            }

            db.saveContent(content).then(res => {
                response.json({ status: 'ok', payload: res });
            }).catch(err => {
                console.error(err);
                response.status(500).json({ error: 'Internal Server Error' });
            });
        }
    });
});

router.post('/upload', (request, response) => {
    const myForm = formidable({
        uploadDir: 'public/uploads',
        keepExtensions: true,
        multiples: true
    });

    myForm.parse(request, (err, fields, files) => {
        if (err) {
            console.warn(err);
            response.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (files && files.imagesrc) {
                files.imagesrc.forEach(file => {
                    filenames.push({
                        newFilename: file.name,
                        originalFilename: file.originalFilename
                    });
                });
            }
            response.json(filenames);
        }
    });
});

router.get('/load_data', (request, response) => {
    db.loadAll().then(contents => {
        response.json({ status: 'ok', payload: contents });
    }).catch(err => {
        console.error(err);
        response.status(500).json({ error: 'Internal Server Error' });
    });
});

router.delete('/remove_content', (request, response) => {
    db.removeContent(request.body._id, request.body._rev).then(res => {
        response.send('OK');
    }).catch(err => {
        console.error(err);
        response.status(500).json({ error: 'Internal Server Error' });
    });
});

export default router;
