const mongoose = require('mongoose')

const getMongoUrl = (options, prod) =>
	prod == true ? options.prodUrl : options.devUrl

const connect = async (options, prod = false) => {
	const mongoConfig = {
		...options.mongoOptions,
	}
	return await mongoose.connect(
		getMongoUrl(options, prod),
		mongoConfig
	)
}

module.exports = Object.assign({}, { connect })
