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

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = (max) => {
    const id = Math.floor(Math.random() * Math.floor(max))
    return id
}

app.post('/api/persons/', (request, response) => {
    const body = request.body
    const personList = persons.map(person => person.name.toLowerCase())

    if (body.name === undefined || body.name === "") {
        return response.status(400).json({error: 'name missing'})
    } else if (body.number === undefined || body.number === "") {
        return response.status(400).json({error: 'number missing'})
    } else if (personList.includes(body.name.toLowerCase())) {
        return response.status(400).json({error: 'Name must be unique'})
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(1000)
    }
    persons = persons.concat(person)
    response.json(person)
})



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