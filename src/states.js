const { connectDb } = require('./connectDb')

exports.getStates = (req, res) => {
	const db = connectDb()
	db.collection('states').get()
  .then(snapshot => {
    const states = snapshot.docs.map(doc => {
      let state = doc.data()
      state.id = doc.id
      return state
    })
    res.send(states)
  })
  .catch(console.error)
}