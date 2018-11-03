require('dotenv').config()

const request = require('./init')

const Auth = {
	getToken: async apiKey => {
		const response = await request({
			method: 'post',
			url: '/token',
			headers: {
				Authorization: `Basic ${apiKey}`,
				'Content-Type': 'application/x-www-form-urlencoded',
				'basiq-version': 2.0,
			},
		})
		return response.access_token
	},
}

module.exports = Object.assign({}, { Auth })
