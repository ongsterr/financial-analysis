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

		let userId

		it('should create a user', async () => {
			const response = await api.Users.create(token, testAccount)
			userId = response.id
			expect(response.type).toBe('user')
			expect(response.email).toBe(testAccount.email)
			expect(response.mobile).toBe(testAccount.mobile)
		})

		it('should retrieve a user', async () => {
			const response = await api.Users.retrieve(token, userId)
			expect(response.type).toBe('user')
			expect(response.email).toBe(testAccount.email)
			expect(response.mobile).toBe(testAccount.mobile)
		})

		it('should update details of a user', async () => {
			const updatedData = {
				mobile: '+61412345678',
			}
			const response = await api.Users.update(token, userId, updatedData)
			expect(response.type).toBe('user')
			expect(response.mobile).toBe(updatedData.mobile)
		})

		it('should delete a user', async () => {
			const response = await api.Users.delete(token, userId)
			expect(response).toBe(204)
		})
	})
})
