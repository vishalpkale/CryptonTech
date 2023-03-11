const fs = require('fs');

function formatBytes(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB','PB','EB','ZB','YB'];
  const kilobyte = 1024;
  let i = 0;
  while (bytes >= kilobyte && i < sizes.length - 1) {
    bytes /= kilobyte;
    i++;
  }
  return `${bytes.toFixed(2)}${sizes[i]}`;
}

function getFiles(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });
  const fileSizes = files
    .filter(file => file.isFile())
    .map(file => ({ name: file.name, size: fs.statSync(`${directory}/${file.name}`).size }));
    
  return fileSizes;
}


function main() {
  const directory = process.argv[2];   // process.argv this is a array conataining the cmd line argumengts pass to the nodejs program
  
  if (!directory) {
    console.error('Please provide a directory path');
    process.exit(1);
  }
  const files = getFiles(directory);
  files
    .sort((a, b) => b.size - a.size)
    .forEach(file => {
      console.log(`${formatBytes(file.size)} ${file.name}`);
    });
}

main();
