import express from 'express';
import plantObject from '../public/JSON/plants_clean.json' assert {type: "json"};
import imageURL from '../public/JSON/imageURL.json' assert {type: "json"};
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
    try {
        let limit;
        let page;
        let previousPage;
        let pages;
        let itemCount;

        // Get total item count from the object keys
        itemCount = Object.keys(plantObject).length;

        // Parse pagination params
        if (req.query.page && req.query.limit) {
            limit = parseInt(req.query.limit) || itemCount;
            page = parseInt(req.query.page) || 1;
            previousPage = page - 1;
        } else {
            limit = itemCount;
            page = 1;
            previousPage = 1;
        }

        // Calculate total pages
        pages = limit !== 0 ? Math.ceil(itemCount / limit) : 1;

        // Slice keys and rebuild paginated object
        const allKeys = Object.keys(plantObject);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedKeys = allKeys.slice(startIndex, endIndex);

        const paginatedPlants = {};
        paginatedKeys.forEach((key) => {
            paginatedPlants[key] = plantObject[key];
        });

        // Respond
        res.status(200).json({
            plants: paginatedPlants,
            pagination: {
                currentPage: page,
                currentItems: limit,
                totalPages: pages,
                totalItems: itemCount,
                _links: {
                    first: {
                        page: 1,
                        href: `${process.env.HOST}/?page=1&limit=${limit}`,
                    },
                    last: {
                        page: pages,
                        href: `${process.env.HOST}/?page=${pages}&limit=${limit}`,
                    },
                    previous: page > 1
                        ? {
                            page: previousPage,
                            href: `${process.env.HOST}/?page=${previousPage}&limit=${limit}`,
                        }
                        : null,
                    next: page < pages
                        ? {
                            page: page + 1,
                            href: `${process.env.HOST}/?page=${page + 1}&limit=${limit}`,
                        }
                        : null,
                },
            }
        });
    } catch (e) {
        res.status(400).json({
            message: 'GET error',
            requestData: req.body,
            error: e,
        });
    }
});


router.get('/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id);

        if (id < 1 || id > 179) {
            res.status(404).json({error: 'Wrong plant ID'})
        } else {

            res.status(200).json(plantObject[id]);
        }

    } catch (e) {
        res.status(400).json({message: 'GET error', requestData: req.body, error: e});
    }

});

router.get('/img/:id', async (req, res) => {
    try {
        const id = req.params.id

        let object = await imageURL[id]

        if (id < 1 || id > 179) {
            res.status(404).json({error: 'Wrong plant ID'})
        } else {
            res.status(200).json(object);
        }

    } catch (e) {
        res.status(400).json({message: 'GET error', requestData: req.body, error: e});
    }

});

router.get('/url/all', async (req, res) => {
    try {
        let object = await imageURL
        res.status(200).json(object);

    } catch (e) {
        res.status(400).json({message: 'GET error', requestData: req.body, error: e});
    }
});

export default router;