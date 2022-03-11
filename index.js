const express = require('express')
const cors = require('cors')
const { getStates } = require('./src/states')
const { postScore, getScoresByUser, deleteScoreById } = require('./src/scores')
const { connectDb } = require('./src/connectDb')
const PORT = process.env.PORT || 3003

const app = express()
app.use(express.json())
app.use(cors())

const withAuthorization = async (req,res,next) => {
  const jwt = req.headers.authorization;
  try {
    const id = await connectDb().auth().verifyIdToken(jwt);
    res.locals.userId = id.uid;
  } catch {
    res.status(403).send('Unauthorized');
    return;
  }
  next();
};

app.get('/states', getStates)

app.post('/scores', postScore)
app.get('/scores/:userId', getScoresByUser)
app.patch('/scores/:scoreId', deleteScoreById)

app.listen(PORT)
