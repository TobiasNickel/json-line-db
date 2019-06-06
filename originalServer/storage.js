const fs = require('fs');
const readLine = require('readline');

exports.store = async function store(path, data) {
    return await fs.promises.appendFile(path, JSON.stringify(data) + '\n');
};

exports.getById = async function (path, id) {
    const fileReader = fs.createReadStream(path);
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