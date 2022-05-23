const fs = require('fs')
const path = require('path')
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const ws = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8')
const rl = readline.createInterface({input, output});

console.log('Enter some text: \n')
rl.on('line', (input) => {
  if (input === 'exit') {
    rl.close()
    console.log('OK, good bye!')
  } 
  else {
    ws.write(`${input}\n`)
  }
})
rl.on('SIGINT', () => {
  rl.close()
  console.log('OK, good bye!')
})
