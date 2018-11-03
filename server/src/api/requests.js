const request = require('./init')

const requests = (token = '') => {
	if (token == '') {
		new Error('No access token was provided.')
	}

	const post = async (url, body = {}) => {
		try {
			const response = await request({
				method: 'post',
				url,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				data: { ...body },
			})
			return response.data
		} catch (err) {
			console.error(err.response.data)
		}
	}

	const get = async url => {
		try {
			const response = await request({
				method: 'get',
				url,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return response.data
		} catch (err) {
			console.error(err.response.data)
		}
	}

	const destroy = async url => {
		try {
			const response = await request({
				method: 'delete',
				url,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return response.status
		} catch (err) {
			console.error(err.response.data)
		}
	}

	return {
		post,
		get,
		destroy,
	}
}

module.exports = requests
