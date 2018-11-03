const requests = require('../requests')

const Transactions = {
	retrieve: async (token, userId, transactionId) =>
		await requests(token).get(`/users/${userId}/transactions/${transactionId}`),
	listAll: async (token, userId) =>
		await requests(token).get(`/users/${userId}/transactions`),
}

module.exports = Object.assign({}, { Transactions })
