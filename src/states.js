const { connectDb } = require('./connectDb')

exports.getStates = (req, res) => {
	const db = connectDb()
	db.collection('states')
		.get()
		.then(snapshot => {
			const states = snapshot.docs.map(doc => {
				let state = doc.data()
				state.id = doc.id
				return state
			})
			res.status(200).send(states)
		})
		.catch(err => res.status(500).send(err))
}

exports.getStateById = (req, res) => {
	const db = connectDb()
	const { stateId } = req.params
	db.collection('states')
		.doc(stateId)
		.get()
		.then(doc => {
			let state = doc.data()
			state.id = doc.id
			res.status(200).send(state)
		})
		.catch(err => res.staus(500).send(err))
}
