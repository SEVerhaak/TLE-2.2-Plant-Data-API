import express from 'express';
import plantObject from '../public/JSON/plants_clean.json' assert { type: "json" };
import imageURL from '../public/JSON/imageURL.json' assert { type: "json" };
import fs from 'fs';

const router = express.Router();
const imagesFolder = './public/images/';

router.use(express.json());

router.use(express.urlencoded({extended: true}));

router.options('/', (req, res) => {
    res.header('Allow', 'GET,OPTIONS,POST');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.status(204).send();
});

router.options('/:id', (req, res) => {
    res.header('Allow', 'GET,PUT,DELETE,OPTIONS, PATCH');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS, PATCH');
    res.status(204).send();
});

router.get('/', async (req, res) => {
    try{
        res.status(200).json(plantObject)
    }
    catch(e){
        res.status(400).json({message: 'GET error', requestData: req.body, error: e});
    }

});

router.get('/:id', async (req, res) => {
    try{
        let id = parseInt(req.params.id);

        if (id < 1 || id > 179){
            res.status(404).json({error: 'Wrong plant ID'})
        } else{

            res.status(200).json(plantObject[id]);
        }

    }
    catch(e){
        res.status(400).json({message: 'GET error', requestData: req.body, error: e});
    }

});

router.get('/img/:id', async (req, res) => {
    try{
        const id = req.params.id

        let object = await imageURL[id]

        if (id < 1 || id > 179){
            res.status(404).json({error: 'Wrong plant ID'})
        } else{
            res.status(200).json(object);
        }

    }
    catch(e){
        res.status(400).json({message: 'GET error', requestData: req.body, error: e});
    }

});

router.get('/url/all', async (req, res) => {
    try{
        let object = await imageURL
        res.status(200).json(object);

    }
    catch(e){
        res.status(400).json({message: 'GET error', requestData: req.body, error: e});
    }
});

export default router;