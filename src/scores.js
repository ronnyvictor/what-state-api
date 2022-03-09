const { connectDb } = require('./connectDb')

exports.postScore = (req, res) => {
	const db = connectDb()

	const newScore = {
		score: req.body.score,
		userId: req.body.userId,
		states: req.body.states,
		date: new Date().toLocaleDateString('en-us', {
			month: '2-digit',
			day: '2-digit',
			year: 'numeric',
		}),
		time: new Date().toLocaleTimeString('en-us', {
			hour: '2-digit',
			minute: '2-digit',
		}),
	}

	db.collection('scores')
		.add(newScore)
		.then(res.send('success'))
		.catch(console.error)
}

exports.getScoresByUser = (req, res) => {
	const db = connectDb()
	const { userId } = req.params
	db.collection('scores')
		.where('userId', '==', userId)
		.get()
		.then(snapshot => {
			const scores = snapshot.docs.map(doc => {
				let score = doc.data()
				score.id = doc.id
        return score;
			})
      res.send(scores)
		})
		.catch(console.error)
}

exports.deleteScoreById = (req, res) => {
  const db = connectDb()
  const {scoreId} = req.params
  db.collection('scores').doc(scoreId).delete()
  .then(res.send('success!'))
  .catch(console.error)
}
