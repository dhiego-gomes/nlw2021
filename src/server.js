const express = require('express')
const route = require('./route')
const path = require('path')

const server = express()    // INICIA O EXPRESS

server.set('view engine', 'ejs')    // INFORMAMOS QUE A VIEW ENGINE É 'ejs'

server.use(express.static('public'))

server.set('views', path.join(__dirname,'views'))    // '__dirname' É GLOBAL E ASSUME O NOME DA PASTA ONDE ARQUIVO ESTÁ

server.use(express.urlencoded({extended: true}))

server.use(route)   // USE O ARQUIVO 'ROUTE'

server.listen(3000, () => console.log('Rodando'))