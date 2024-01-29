const express = require('express')
const path = require('path')

const app = express()
app.use(express.static(path.join(__dirname, '/dist')))
app.get('*/*.js', (req, res) => {
    const urlParts = req.url.split('/')
    res.sendFile(path.join(__dirname + '/dist/static/js/' + urlParts[urlParts.length - 1]))
})
app.get('*/*.css', (req, res) => {
    const urlParts = req.url.split('/')
    res.sendFile(path.join(__dirname + '/dist/static/css/' + urlParts[urlParts.length - 1]))
})
app.get('*/*.css.map', (req, res) => {
    const urlParts = req.url.split('/')
    res.sendFile(path.join(__dirname + '/dist/static/css/' + urlParts[urlParts.length - 1]))
})
app.get('*/*.(jpg|svg|png|woff|woff2|ttf)', (req, res) => {
    const urlParts = req.url.split('/')
    res.sendFile(path.join(__dirname + '/dist/static/media/' + urlParts[urlParts.length - 1]))
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'))
})
const port = process.env.PORT || 3000
app.listen(port)
console.log('App is listening on port ' + port)
