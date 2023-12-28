const fs = require("fs");
const DB_FILE_PATH = "./core/db";

console.log('hello');

function create(content){
    fs.writeFileSync(DB_FILE_PATH, content);
    return content;
}

console.log(create('Hoje quero aprender!'));
