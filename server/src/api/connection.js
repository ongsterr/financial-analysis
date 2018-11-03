const requests = require('./requests')

const Connections = {
	create: async (token, userId, data) =>
		await requests(token).post(`/users/${userId}/connections`, data),
	refresh: async (token, userId, connectionId) =>
		await requests(token).post(
			`/users/${userId}/connections/${connectionId}/refresh`
		),
	refreshAll: async (token, userId) =>
		await requests(token).post(`users/${userId}/connections/refresh`),
	retrieve: async (token, userId, connectionId) =>
		await requests(token).get(`/user/${userId}/connections/${connectionId}`),
	update: async (token, userId, connectionId, data) =>
		await requests(token).post(
			`/users/${userId}/connections/${connectionId}`,
			data
		),
	delete: async (token, userId, connectionId) =>
		await requests(token).destroy(
			`/users/${userId}/connections/${connectionId}`
		),
	listAll: async (token, userId) =>
		await requests(token).get(`/users/${userId}/connections`),
}

module.exports = Object.assign({}, { Connections })
