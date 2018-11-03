const request = require('../init')

const Auth = {
	getToken: async apiKey => {
		try {
			const response = await request({
				method: 'post',
				url: '/token',
				headers: {
					Authorization: `Basic ${apiKey}`,
					'content-type': 'application/x-www-form-urlencoded',
					'basiq-version': '2.0',
				},
			})
			return response.data
		} catch (err) {
			console.error(err.error)
		}
	},
}

module.exports = Object.assign({}, { Auth })
