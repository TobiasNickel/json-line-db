const express = require('express');
const storage = require('./storage');

const app = express();
app.listen(process.env.PORT || 3000, ()=>{
    console.log(`listen on port ${process.env.PORT || 3000}`);
});
app.use(express.json({}));

app.post('/api/item/:collection', async (req, res) => {
    try {
        if (typeof req.body !== "object") return res.status(300).json('missing data');
        await storage.store(collectionFile(req.params.collection), req.body);
        res.json(true);
    } catch (err) {
        res.json({ m: err.message });
    }
});

app.get('/api/item/:collection/:index', async (req, res) => {
    try {
        res.json(await storage.getOne(collectionFile(req.params.collection), req.params.index));
    } catch (err) {
        res.json({ m: err.message });
    }
});

function collectionFile(name) {
    return `${__dirname}/data/${name}.jsonl`;
}
