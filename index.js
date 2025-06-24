import express from 'express';
import router from './routes/plants.js';
import 'dotenv/config'

const app = express();

app.use('/public', express.static('public'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use((req, res, next) => {

        next();
});

app.get('/', (req, res) => {
    res.json({ message: `Hello World` });
});

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server started on port ${process.env.EXPRESS_PORT}`);
    console.log(`Server address is: ${process.env.HOST}`);
});

app.use('/plants', router);
