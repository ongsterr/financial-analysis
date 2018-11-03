const requests = require('../requests')

const Institutions = {
	retrieve: async (token, institutionId) =>
		await requests(token).get(`/institutions/${institutionId}`),
	listAll: async token => await requests(token).get(`/institutions`),
}

module.exports = Object.assign({}, { Institutions })
