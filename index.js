
    const PORT = process.env.PORT || 11000
    const express = require('express')
    const axios = require('axios')
    const cheerio = require('cheerio')
    const app = express()
    
    const newspapers = [
        {
            name: 'globo',
            address: 'https://g1.globo.com/',
            base: ''
        },
        {
            name: 'folhasp',
            address: 'https://www1.folha.uol.com.br/poder/',
            base: ''
        },
        
    ]
    
    const articles = []
    
    newspapers.forEach(newspaper => {
        axios.get(newspaper.address)
            .then(response => {
                const html = response.data
                const $ = cheerio.load(html)
    
                $('a:contains("vacina")', html).each(function () {
                    const title = $(this).text()
                    const url = $(this).attr('href')
    
                    articles.push({
                        title,
                        url: newspaper.base + url,
                        source: newspaper.name
                    })
                })

                $('a:contains("Bolsonaro")', html).each(function () {
                    const title = $(this).text()
                    const url = $(this).attr('href')
    
                    articles.push({
                        title,
                        url: newspaper.base + url,
                        source: newspaper.name
                    })
                })
                
                $('a:contains("Governo")', html).each(function () {
                    const title = $(this).text()
                    const url = $(this).attr('href')
    
                    articles.push({
                        title,
                        url: newspaper.base + url,
                        source: newspaper.name
                    })
                })

                $('a:contains("Lula")', html).each(function () {
                    const title = $(this).text()
                    const url = $(this).attr('href')
    
                    articles.push({
                        title,
                        url: newspaper.base + url,
                        source: newspaper.name
                    })
                })
    
            })
    })
    
    app.get('/', (req, res) => {
        res.json('Bem vindo a minha API BolsoLula!')
    })
    
    app.get('/news', (req, res) => {
        res.json(articles)
    })

app.listen(11000,()=>{
    console.log('server rodando!');
})


