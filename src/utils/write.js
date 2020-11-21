const fs = require('fs');
const path = require('path');

function write(fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, error => {
      if (error instanceof Error) {
        return reject(`\n write ${fileName} failed`);
      }
      return resolve('\n write ${fileName} succeed');
    });
  });
}

exports.write = write;
