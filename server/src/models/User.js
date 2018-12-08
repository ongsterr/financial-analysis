const mongoose = require('mongoose')

const api = require('../api')
const { apiConfig } = require('../config')

const { Schema } = mongoose

const UserSchema = new Schema({
	firstName: {
		type: String,
		lowercase: true,
	},
	lastName: {
		type: String,
		lowercase: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	dob: {
		type: String,
	},
	apiUserID: {
		type: String,
		unique: true,
		default: '',
	},
	status: {
		type: String,
		enum: ['active', 'inactive'],
		default: 'active',
	},
})

UserSchema.pre('save', async function() {
	const userData = {
		email: this.email,
		mobile: this.mobile,
	}
	const auth = await api.Auth.getToken(apiConfig.key)
	const token = auth.access_token
	const response = await api.Users.create(token, userData)
	const check = response.email == this.email

	if (check) {
		this.apiUserID = response.id
	} else {
		throw new Error('User creation was not successful. Please try again.')
	}

	if (this.apiUserID == '') {
		throw new Error('User was not allocated api ID.')
	}
})

UserSchema.pre('update', async function() {
	const auth = await api.Auth.getToken(apiConfig.key)
	const token = auth.access_token

	if (this.status == 'inactive') {
		const deleteResponse = await api.Users.delete(token, this.apiUserID)
		if (deleteResponse != 204)
			throw new Error('User removal was not successful')
	}
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
