const api = require('../api')
const { apiConfig } = require('../config')

describe('Basiq API testing', () => {
	let token

	describe('Basiq API authentication', () => {
		it('should return access token', async () => {
			const response = await api.Auth.getToken(apiConfig.key)
			token = response.access_token
			expect(token).toHaveLength(353)
		})
	})

	describe('Basiq API user object testing', () => {
		const testAccount = {
			email: 'gavin@hooli.com',
			mobile: '+61410888666',
		}

		it('should create a user', async () => {
			const response = await api.Users.create(token, testAccount)
			expect(response.type).toBe('user')
		})
	})
})
