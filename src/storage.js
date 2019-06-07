const fs = require('fs');
const fsp=fs.promises;
const readLine = require('readline');

exports.store = async function store(name, data) {
    const path = collectionFile(name);
    const file = await fsp.open(path, 'w+');
    return file
}
exports.getOne = async function (name, id) {
    const fileReader = fs.createReadStream(collectionFile(name));
    const lineReader = readLine.createInterface({
        input: fileReader
    });
    let i = 0;
    for await (const data of lineReader) {
        if (i == id) {
            fileReader.close();
            return JSON.parse(data);
        }
        i++;
    }
};

function collectionFile(name) {
    return `${__dirname}/data/${name}.jsonl`;
}
