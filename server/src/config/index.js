require('dotenv').config()

const db = require('./mongo')

const axiosConfig = {
	baseURL: process.env.BASIQ_BASE_URL,
}

const apiConfig = {
	key: process.env.BASIQ_API_KEY,
}

const serverConfig = {
	port: process.env.PORT,
}

const dbConfig = {
	devUrl: `mongodb://localhost/${process.env.MONGO_DEV_DB}`,
	prodUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${
		process.env.MONGO_SERVER
	}`,
	mongoOptions: {
		useNewUrlParser: true,
		reconnectInterval: 500,
		poolSize: 10,
		bufferMaxEntries: 0,
		connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
		socketTimeoutMS: 120000, // Close sockets after 120 seconds of inactivity
		family: 4,
	},
}

module.exports = Object.assign(
	{},
	{ axiosConfig, serverConfig, apiConfig, dbConfig, db }
)
