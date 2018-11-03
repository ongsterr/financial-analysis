require('dotenv').config()

const axiosConfig = {
	baseURL: process.env.BASIQ_BASE_URL,
}

const apiConfig = {
	key: process.env.BASIQ_API_KEY,
}

const serverConfig = {
	port: process.env.PORT,
}

module.exports = Object.assign({}, { axiosConfig, serverConfig, apiConfig })
