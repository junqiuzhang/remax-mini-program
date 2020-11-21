const path = require('path');
const crypto = require('crypto');
const { read } = require('./read');
const { write } = require('./write');
const pathName = path.resolve('/Users/junqiuzhang/Downloads/picture');
const fileName = path.resolve('/Users/junqiuzhang/Downloads/picture.json');

function formatPicture({ id, name }) {
  return {
    _id: id,
    value: name
  };
}
function main() {
  let data = '';
  read(pathName)
    .then(fileNames => {
      for (let i = 0; i < fileNames.length; i++) {
        if (i===0) {
          continue;
        }
        const name = fileNames[i];
        const hash = crypto.createHash('md5');
        hash.update(name);
        const id = hash.digest('hex');
        const pictureObj = formatPicture({ id, name });
        data += `\n${JSON.stringify(pictureObj)}`;
      }
      data = data.slice(1);
      write(fileName, data).catch(console.log);
    })
    .catch(console.log);
}

main();
