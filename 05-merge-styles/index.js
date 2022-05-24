const { readFile, appendFile, rm } = require('fs')
const { readdir } = require('fs/promises')
const path = require('path')


const directory = path.join(__dirname, 'styles') 

async function createBundle() {
    const dir = await readdir(directory, {withFileTypes: true})
    const propFiles = dir.filter(element => (element.isFile()) && (path.extname(element.name).toString().slice(1) === 'css'))
    console.log(propFiles)
    data = ''
    propFiles.forEach(element => {
        readFile(path.join(__dirname, 'styles', element.name), {encoding : 'utf-8'}, (err, data) => {
            if (err) throw err
            else {
                appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, (err) => {
                    if (err) throw err
                })
            }
        })
    })
}

rm(path.join(__dirname, 'project-dist', 'bundle.css'), {recursive : true, force : true}, (err) => {
    if (err) throw err
    else {
        createBundle()
    }
})

