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
		match:
			'^([a-zA-Z0-9_-.]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([a-zA-Z0-9-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$',
		unique: true,
		required: true,
	},
	dob: {
		type: String,
	},
	apiUserID: {
		type: String,
		unique: true,
	},
	status: {
		type: String,
		enum: ['active', 'inactive'],
		default: 'active',
	},
})

UserSchema.pre('save', async () => {
	const userData = {
		email: this.email,
		mobile: this.mobile,
	}
	const token = await api.Auth.getToken(apiConfig.key)
	const response = await api.Users.create(token, userData)
	const check = response.email == this.email && response.mobile == this.mobile

	if (check) {
		this.apiUserID = response.id
	} else {
		new Error('User creation was not successful. Please try again.')
	}
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
