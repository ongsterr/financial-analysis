const api = require('../api')
const { apiConfig } = require('../config')

describe('Basiq API testing', () => {
	const testAccount = {
		email: 'gavin@hooli.com',
		mobile: '+61410888666',
	}

	let token

	describe('Basiq API authentication', () => {
		it('should return access token', async () => {
			const response = await api.Auth.getToken(apiConfig.key)
			token = response.access_token
			expect(token).toHaveLength(353)
		})
	})

	describe('Basiq API user object testing', () => {
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

	describe('Basiq API institution object testing', () => {
		const testInstitutionData = {
			id: 'AU00001',
			name: 'Basiq Bank',
			shortName: 'Basiq',
			institutionType: 'Test Bank',
			country: 'Australia',
			serviceName: 'Personal Online Banking',
			serviceType: 'Personal Banking',
			loginIdCaption: 'Login',
			passwordCaption: 'Password',
		}

		it('should retrieve an institution', async () => {
			const response = await api.Institutions.retrieve(
				token,
				testInstitutionData.id
			)
			expect(response.name).toBe(testInstitutionData.name)
			expect(response.country).toBe(testInstitutionData.country)
			expect(response.serviceName).toBe(testInstitutionData.serviceName)
			expect(response.serviceType).toBe(testInstitutionData.serviceType)
			expect(response.loginIdCaption).toBe(testInstitutionData.loginIdCaption)
		})

		it('should list all institutions', async () => {
			const response = await api.Institutions.listAll(token)
			expect(response.type).toBe('list')
			expect(response.data.length).toEqual(response.totalCount)
		})
	})

	describe('Basiq API connection object testing', () => {
		const userConnectionData = {
			loginId: 'gavinBelson',
			password: 'hooli2016',
			institution: {
				id: 'AU00000',
			},
		}

		let userId
		let jobId
		let connectionId

		beforeAll(async () => {
			const response = await api.Users.create(token, testAccount)
			userId = response.id
		})

		afterAll(async () => {
			await api.Users.delete(token, userId)
		})

		it('should create a connection and return a job', async done => {
			const response = await api.Connections.create(
				token,
				userId,
				userConnectionData
			)
			jobId = response.id

			expect(response.type).toBe('job')
			done()
		})

		it('should list all the connections', async done => {
			const response = await api.Connections.listAll(token, userId)

			expect(response.type).toBe('list')
			expect(response.data).toHaveLength(1)
			connectionId = response.data[0].id
			done()
		})

		// it('should retrieve the job and show the connection id if job successful', async done => {
		//  const response = await api.Jobs.retrieve(token, jobId)
		// 	const stepOne = response.steps[0]
		// 	connectionId = stepOne.result[0].url.split('/')[3]

		// 	expect(setTimeout).toHaveBeenCalledTimes(1)
		// 	expect(response.type).toBe('job')
		// 	expect(stepOne.title).toBe('verify-credentials')
		// 	expect(stepOne.status).toBe('success')
		// 	expect(connectionId).toHaveLength(32)
		// 	done()
		// })

		it('should retrieve connection', async () => {
			const response = await api.Connections.retrieve(
				token,
				userId,
				connectionId
			)

			expect(response.type).toBe('connection')
			expect(response.status).toBe('pending')
			expect(response.institution.id).toBe(userConnectionData.institution.id)
		})

		it('should delete the connection', async () => {
			const response = await api.Connections.delete(token, userId, connectionId)
			expect(response).toBe(204)
		})
	})
})
