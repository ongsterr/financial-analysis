const requests = require('../requests')

const Users = {
	create: async (token, data) => await requests(token).post('/users', data),
	retrieve: async (token, userId) =>
		await requests(token).get(`/users/${userId}`),
	update: async (token, userId, data) =>
		await requests(token).post(`/users/${userId}`, data),
	delete: async (token, userId) =>
		await requests(token).destroy(`/users/${userId}`),
}

module.exports = Object.assign({}, { Users })
