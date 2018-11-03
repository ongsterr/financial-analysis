const Auth = require('./auth')
const Users = require('./user')
const Connections = require('./connection')
const Accounts = require('./account')
const Transactions = require('./transaction')
const Institutions = require('./institution')

module.exports = Object.assign(
	{},
	{ Auth, Users, Connections, Accounts, Transactions, Institutions }
)
