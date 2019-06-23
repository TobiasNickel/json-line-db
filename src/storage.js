const fs = require('fs');
const fsp=fs.promises;
const readLine = require('readline');

const INDEX_LINE_LENGH = 15;

/**
 * @param {string} name
 * @param {object} data
 */
exports.store = async function store(name, data) {
  data.id = parseInt(data.id) || await getNextId(name);
  const path = collectionFilePath(name);
  const file = await fsp.open(path, 'a');
  const content = JSON.stringify(data)+'\n';
  await file.appendFile(content);
  const stat = await file.stat();
  const docPosition = stat.size - content.length;
  await writeToPos(indexFilePath(name), data.id * INDEX_LINE_LENGH, docPosition.toString().padEnd(INDEX_LINE_LENGH-1)+'\n')
  return data;
}
exports.getOneById = async function (name, id) {
  const indexBuffer = Buffer.alloc(INDEX_LINE_LENGH);
  const indexFile = await fsp.open(indexFilePath(name),'r');
  await indexFile.read(indexBuffer, 0, INDEX_LINE_LENGH,id* INDEX_LINE_LENGH);
  const dataPos = parseInt(indexBuffer.toString());
  await indexFile.close();
  
  const dataLine = await exports.getLineAt(name, dataPos);
  return JSON.parse(dataLine);

};

/**
 * 
 * @param {string} name 
 */
function collectionFilePath(name) {
  return `${__dirname}/data/${name}.jsonl`;
}
function indexFilePath(name) {
  return `${__dirname}/data/${name}.idIndex`;
}


async function getNextId(name){
  try{
    const stat = await fsp.stat(indexFilePath(name));
    return stat.size / INDEX_LINE_LENGH
  }catch{
    return 0;
  }
}

/**
 *
 * @param {string} name
 * @param {number} pos
 */
exports.getLineAt = async function getLineAt(name, pos = 0){
  const path = collectionFilePath(name);
  const fileStream = fs.createReadStream(path,{
    start: pos
  });
  const lineStream = readLine.createInterface({
    input: fileStream
  });
  for await (const data of lineStream) {
    await fileStream.close();
    return data;
  }
}


async function writeToPos(path, pos, content) {
  const file = await fsp.open(path, 'a+');
  const written = await file.write(content, pos, undefined, undefined);
  await file.close();
}

;
(async () => {
  // for(let i = 0; i<1000000;i++){
  //   await exports.store('item',{name:'Natalie'})
  //   await exports.store('item',{name:'Raphael'})
  //   await exports.store('item',{name:'Peter'})
  //   await exports.store('item',{name:'Karsten'})
  //   await exports.store('item',{name:'Mathias'})
  //   await exports.store('item',{name:'Susanne'})
  //   await exports.store('item',{name:'Ramona'})
  //   await exports.store('item',{name:'Christian'})
  //   await exports.store('item',{name:'Lars'})
  //   await exports.store('item',{name:'Bertram'})
  // }
  // await exports.store('item',{name:'Ramon',id:220000})
  // var item2 = await exports.getOne('item', 220000)
  // console.log(item2);

})().catch(err=>console.log(err));
