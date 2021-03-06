const UserModel = require('../models/User')

const userRepo = db => {
	const User = db.model('User')
	const updateOptions = { new: true, runValidators: true }

	const createUser = async ({ firstName, lastName, email, dob }) => {
		try {
			return await User.create({
				firstName,
				lastName,
				email,
				dob,
			})
		} catch (e) {
			console.error(e)
		}
	}

	const retrieveUser = async userId => {
		try {
			return await User.findById(userId)
				.lean()
				.exec()
		} catch (e) {
			console.error(e)
		}
	}

	const listAllUsers = async () => {
		try {
			return await User.find()
				.lean()
				.exec()
		} catch (e) {
			console.error(e)
		}
	}

	const updateUser = async (userId, update) => {
		try {
			return await User.findByIdAndUpdate(userId, update, updateOptions)
				.lean()
				.exec()
		} catch (e) {
			console.error(e)
		}
	}

	const deleteUser = async userId => {
		try {
			return await User.findByIdAndUpdate(
				userId,
				{ status: 'inactive' },
				updateOptions
			)
				.lean()
				.exec()
		} catch (e) {
			console.error(e)
		}
	}

	const disconnect = async () => await db.disconnect()

	return {
		createUser,
		retrieveUser,
		updateUser,
		deleteUser,
		listAllUsers,
		disconnect,
	}
}

module.exports = Object.assign({}, { userRepo })
