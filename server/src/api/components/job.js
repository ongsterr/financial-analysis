const requests = require('../requests')

const Jobs = {
	retrieve: async (token, jobId) => await requests(token).get(`/jobs/${jobId}`),
}

module.exports = Object.assign({}, { Jobs })
