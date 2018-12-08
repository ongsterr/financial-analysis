const { userRepo } = require('./user')

const connect = db => {
	if (!db) {
		new Error('DB is not connected.')
	}

	return {
		...userRepo(db),
	}
}

module.exports = Object.assign({}, { connect })
