const requests = require('../requests')

const Accounts = {
	retrieve: async (token, userId, accountId) =>
		await requests(token).get(`/users/${userId}/accounts/${accountId}`),
	listAll: async (token, userId) =>
		await requests(token).get(`/users/${userId}/accounts`),
}

module.exports = Object.assign({}, { Accounts })
