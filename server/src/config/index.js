require('dotenv').config()

const axiosConfig = {
	baseUrl: process.env.BASIQ_BASE_URL,
}

const serverConfig = {
	port: process.env.PORT,
}

module.exports = Object.assign({}, { axiosConfig, serverConfig })
