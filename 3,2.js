const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json())

let persons = [
    {
        name: "Arto Kamehameha",
        number: "040-123456",
        id: 1
    },
    {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
    },
    {
        name: "Teemu Heikkinen",
        number: "040-69",
        id: 3
    },
    {
        name: "Halfstack-Heikkinen",
        number: "040-1337",
        id: 4
    }
]

const generateInfo = () => {
    const personCount = persons.length
    const pvm = new Date()
    return `<h3>Puhelinluettelossa on ${personCount} henkilön tiedot.</h3> ${pvm} `
}



app.get('/', (req, res) => {
    res.send('<h1> Hello, World! </h1>')
})

app.get('/info', (req, res) => {
    res.send(generateInfo())
})


app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if ( person ) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/api/persons/', (req, res) => {
    res.json(persons)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}.`)