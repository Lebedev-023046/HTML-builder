const { copyFile, rm } = require('fs')
const { mkdir, readdir } = require('fs/promises')
const path = require('path')

let directory = path.join(__dirname, 'files')
let dest = path.join(__dirname, 'files-copy') 


async function copyWholeFolder(directory, dest) {
    const dir = await readdir(directory, {withFileTypes: true})
    dir.forEach(element => {
        if (element.isFile()) {
            copyFile(path.join(directory, element.name),
                     path.join(dest, element.name),
                     (err) => {if (err) throw err})
        }
        else {
            mkdir(path.join(dest, element.name), {recursive: true})
            copyWholeFolder(path.join(directory, element.name), path.join(dest, element.name))
        }
    })
}

rm(dest, {recursive : true, force : true}, (err) => {
    if (err) throw err
    mkdir(dest, {recursive: true}, (err) => {
        if (err) throw err
    })
    copyWholeFolder(directory, dest)
})





