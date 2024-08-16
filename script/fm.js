import fs from 'fs';
import path from 'path';

// __dirname in es6 modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// 指定要遍历的目录
const directoryPath = path.join(__dirname, '../src/content/docs');


// scan file in a dir recursive
function readdir(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const pathname = path.join(dir, file);
    if (fs.statSync(pathname).isDirectory()) {
      readdir(pathname, callback);
    } else {
      callback(pathname);
    }
  })
}

readdir(directoryPath, (filePath) => {
  if (path.extname(filePath) !== '.md') return
  processMarkdownFile(filePath);
});


function processMarkdownFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.log('Unable to read file: ' + err);
    }

    const lines = data.split('\n');
    let title = '';
    let description = '';
    let isTitleFound = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('# ') && !isTitleFound) {
        title = line.replace('# ', '');
        isTitleFound = true;
      } else if (isTitleFound && line !== '') {
        description = line;
        break;
      }
    }

    const frontmatter = `---\ntitle: "${title}"\ndescription: "${description}"\n---\n\n`;
    const newData = frontmatter + data;

    fs.writeFile(filePath, newData, 'utf8', (err) => {
      if (err) {
        return console.log('Unable to write file: ' + err);
      }
      console.log(`Processed file: ${filePath}`);
    });
  });
}