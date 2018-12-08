const { db, dbConfig } = require('../config')
const repository = require('../repository')

describe('Testing repo methods for User-related', () => {
	let connection
	let repo
	let userId

	beforeAll(async () => {
		connection = await db.connect(dbConfig)
		repo = repository.connect(connection)
	})

	afterAll(async () => {
		await rep.disconnect()
	})

	it('should create user in db', async () => {
		const testData = {
			firstName: 'ben',
			lastName: 'lee',
			email: 'ben.lee@email.com',
			dob: '10/10/1995',
		}
		const newUser = await repo.createUser(testData)
		expect(newUser.email).toBe(testData.email)
		userId = newUser._id
	})

	it('should delete user from db', async () => {
		const deletedUser = await repo.deleteUser(userId)
		expect(deletedUser._id).toEqual(userId)
		expect(deletedUser.status).toBe('inactive')
	})
})
