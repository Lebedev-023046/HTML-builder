const { readdir } = require('fs/promises')
const fs = require('fs')
const path = require('path')


async function showDirInfo(){
    const dir = await readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true})
    const filteredDir = dir.filter(element => element.isFile())
    let info = []
    filteredDir.forEach((element, i) => {
        fs.stat(path.join(__dirname, `secret-folder`, element.name), (err, stats) => {
            err ? console.log(err.message) : 
            console.log(`${info[i]} - ${stats.size} bytes`)
        })    
    })
    filteredDir.forEach((element) => {
        let name = element.name.toString().split('.')[0]
        let ext = path.extname(element.name).toString().slice(1)
        info.push(`${name} - ${ext}`)     
    })
}

showDirInfo()

