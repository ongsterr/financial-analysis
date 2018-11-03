const request = require('./init')

const requests = (token = '') => {
	const post = async (url, body = {}) => {
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
	}

	const get = async url => {
		const response = await request({
			method: 'get',
			url,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		return response.data
	}

	const destroy = async url => {
		const response = await request({
			method: 'delete',
			url,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		return response
	}

	return {
		post,
		get,
		destroy,
	}
}

module.exports = Object.assign({}, { requests })
