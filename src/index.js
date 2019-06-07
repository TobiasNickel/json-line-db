const express = require('express');
require('tAsyncExpress')
const storage = require('./storage');

const app = express();
app.listen(process.env.PORT || 3000);
app.use(express.json({}));

app.get('/', (req, res) => { res.json({da:'ta'}) })

app.post('/api/:collection', async (req, res) => {
    try {
        if (typeof req.body !== "object") return res.status(300).json('missing data');
        await storage.store(req.params.collection, req.body);
        res.json(true);
    } catch (err) {
        res.json({ m: err.message });
    }
});

app.get('/api/:collection/:index', async (req, res) => {
    try {
        res.json(await storage.getById(collectionFile(req.params.collection), req.params.index));
    } catch (err) {
        res.json({ m: err.message });
    }
});

