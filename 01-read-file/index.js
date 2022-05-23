const fs = require('fs');
const path = require('path');

// fs.readFile(path.join(__dirname, 'text.txt'), 'utf-8', (err, data) => {
//     if (err) throw err
//     else console.log(data)
// })

const rs = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let data = '';
rs.on('data', chunk => data += chunk);
rs.on('end', () => console.log(data));
rs.on('error', (error) => console.log(console.log(error.message)));


