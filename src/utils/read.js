const fs = require('fs');

function read(pathName) {
  return new Promise((resolve, reject) => {
    fs.readdir(pathName, (error, files) => {
      if (error instanceof Error) {
        return reject(`\n read ${pathName} failed`);
      }
      return resolve(files);
    });
  });
}
exports.read = read;