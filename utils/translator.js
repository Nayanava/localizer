const axios = require('axios').default;
const baseUrl = "https://api.cognitive.microsofttranslator.com/"
const { v4: uuidv4} = require('uuid')

var subscriptionKey = 'ee23f9c1f07a4091ab7748ef6b316dc4'
var location = 'centralindia'

const translateFromLangToLang = (text, fromLang, toLang, cb) => {
    axios ({
        baseURL: baseUrl,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            'from': fromLang,
            'to': toLang
        },
        data: [{
            'text': text
        }],
        responseType: 'json'
    }).then(function({status, data} = {}){
        if(status != 200) {
            cb(status, `Failed to translate text to the specified language ${toLang}`)
            return
        }
        try {
        const translations = data[0].translations
        cb(status, translations[0].text)
        } catch (e) {
            console.error("Error in fetching details", e)
            cb(500, 'There has been a server side error in processing the request')
        }
    })
}

const translateFromEnglishToLang = (text, toLang, cb) => {
    translateFromLangToLang(text, 'en', toLang, cb)
}

const supportedLangs = (cb) => {
    axios ({
        baseURL: baseUrl,
        url: '/languages',
        method: 'get',
        headers: {
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0'
        },
        responseType: 'json'
    }).then(function(response){
        var languages = {};
        for (const [key, value] of Object.entries(response.data.dictionary)) {
            languages[value.name] = key
        }
        cb(languages)
    })
}
module.exports = {
    translateFromEnglishToLang: translateFromEnglishToLang,
    supportedLangs: supportedLangs
}