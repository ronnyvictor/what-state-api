const express = require('express')
const cors = require('cors')
const { getStates, getStateById, newState } = require('./src/states')
const PORT = process.env.PORT || 3003

const app = express()
app.use(express.json())
app.use(cors())

app.get('/states', getStates)
app.get('/states/:stateId', getStateById)
app.post('/states', newState)

app.listen(PORT)
