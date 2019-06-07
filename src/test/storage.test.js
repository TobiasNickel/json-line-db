const storage = require('../storage');
const fs = require('fs');
const fsp = fs.promises;

describe('storage',()=>{
    it('should create the collection file', async ()=>{
        var data = {some:'data'};
        const collectionName = 'collection';
        const path = __dirname+'/../data/'+collectionName+'.jsonl';
        await storage.store(collectionName, data);
        const status = await fsp.stat(path);
        console.assert(status);
        await fsp.unlink(path);
    });
});