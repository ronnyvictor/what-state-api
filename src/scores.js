const { connectDb } = require('./connectDb')
const { FieldValue } = require('firebase-admin/firestore')

exports.postScore = (req, res) => {
	const db = connectDb()

	const newScore = {
		score: req.body.score,
		userId: req.body.userId,
		states: req.body.states,
		deleted: false,
		timestamp: FieldValue.serverTimestamp(),
	}

	db.collection('scores')
		.add(newScore)
		.then(res.send(newScore))
		.catch(console.error)
}

exports.getScoresByUser = (req, res) => {
	const db = connectDb()
	const { userId } = req.params
	db.collection('scores')
		.where('userId', '==', userId)
		.where('deleted', '==', false)
		.get()
		.then(snapshot => {
			const scores = snapshot.docs.map(doc => {
				let score = doc.data()
				score.id = doc.id
				return score
			})
			res.send(scores)
		})
		.catch(console.error)
}

exports.deleteScoreById = (req, res) => {
	const db = connectDb()
	const { scoreId } = req.params
	db.collection('scores')
		.doc(scoreId)
		.update({ deleted: true })
		.then(res.send('success!'))
		.catch(console.error)
}
