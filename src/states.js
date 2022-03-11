const { connectDb } = require('./connectDb')

exports.getStates = (req, res) => {
	const db = connectDb()
	db.collection('states')
		.get()
		.then(snapshot => {
			const states = snapshot.docs.map(doc => {
				let state = doc.data()
				state.id = doc.id
				state.colors = {
					active: '#ffeecb',
					correct: '#1b5299',
					incorrect: '#b81118',
				}
				return state
			})
			res.status(200).send(states)
		})
		.catch(err => res.status(500).send(err))
}
