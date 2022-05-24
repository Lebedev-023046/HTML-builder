const { copyFile, readFile, appendFile, rm } = require('fs')
const { mkdir, readdir } = require('fs/promises')
const path = require('path')
const fsPromise = require('node:fs/promises')


let directory = path.join(__dirname, 'assets')
let dest = path.join(__dirname, 'project-dist', 'assets') 

async function copyWholeFolder(directory, dest) {
    mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true})
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

async function createCssBundle() {
    const dir = await readdir(path.join(__dirname, 'styles'), {withFileTypes: true})
    const propFiles = dir.filter(element => (element.isFile()) && (path.extname(element.name).toString().slice(1) === 'css'))
    data = ''
    propFiles.forEach(element => {
        readFile(path.join(__dirname, 'styles', element.name), {encoding : 'utf-8'}, (err, data) => {
            if (err) throw err
            else {
                appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, (err) => {
                    if (err) throw err
                })
            }
        })
    })
}

async function createHTMLBundle() {
    let template = await fsPromise.readFile(path.join(__dirname, 'template.html'), {encoding : 'utf-8'})
    const npropDir = await readdir(path.join(__dirname, 'components'), {withFileTypes: true})
    const dir = npropDir.filter(element => path.extname(element.name) === '.html')
    for (i=0;i<dir.length;i++) {
        let elem = await fsPromise.readFile(path.join(__dirname, 'components', dir[i].name), {encoding : 'utf-8'}, (err) => {if (err) throw err})
        template = template.replace(`{{${dir[i].name.split('.')[0]}}}`, elem)
    }
    appendFile(path.join(__dirname, 'project-dist', 'index.html'), template, (err) => {if (err) throw err})
}




const bundleProject = () => {
    mkdir(path.join(__dirname, 'project-dist'), {recursive: true})
    copyWholeFolder(directory, dest)
    createCssBundle()
    createHTMLBundle()
}

rm(path.join(__dirname, 'project-dist'), {recursive : true, force : true}, (err) => {
    if (err) throw err
    else {
        bundleProject()
    }
})


