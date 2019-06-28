


const express = require('express')
const app = express()

app.use(express.static('./'))

app.listen('8080', function () {
    console.log('Example app listening on port ' + 8080 + ' !')
})

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/api', (req, res) => res.send('api'))
app.post('/api', (req, res) => res.send('post api'))


app.get('/data', (req, res) => res.send({ a: 1, b: 2 }))



