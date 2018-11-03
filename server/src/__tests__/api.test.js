const api = require('../api')
const { apiConfig } = require('../config')

describe('Basiq API authentication', () => {
	it('should return access token', async () => {
		const response = await api.Auth.getToken(apiConfig.key)
		expect(response.access_token).toHaveLength(353)
	})
})
