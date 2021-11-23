const express = require('express')
const app = express()
const translator = require("./utils/translator.js")

app.use(express.json())
app.use(express.urlencoded({extended: false}))
//Endpoint to get all supported languages


app.get('/languages', (req, res) => {
    translator.supportedLangs((data) => {
        console.log(JSON.stringify(data, null, 4))
        res.send(data)
    })
})

app.post('/translate', (req, res) => {
    var body = req.body
    var text = body.text
    var toLanguage = body.toLang
    translator.translateFromEnglishToLang(text, toLanguage, (status, data) => {
        res.status(status)
        res.send(data)
    })
})
// Creating a server to listen to port 8080
//translator.translateFromEnglishToLang("How are you?", 'bn')

var server = app.listen(8080, () => {
    var host = server.address().address
    var port = server.address().port
    console.log(`REST API listening on ${host}:${port}`)
})