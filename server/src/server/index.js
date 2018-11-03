const express = require('express')
const helmet = require('helmet')
const logger = require('morgan')

const start = options => {
	if (!options.port) {
		new Error('The server must be started with an available port.')
	}

	const app = express()

	app.use(express.json())
	app.use(express.urlencoded({ extended: false }))
	app.use(logger('dev'))

	app.use(helmet())

	app.use((err, _, res, __) => {
		res.status(err.status || 500)
		res.json({
			errors: {
				message: err.message,
				error: err,
			},
		})
	})

	return app.listen(options.port, () =>
		console.log(`Listening on port ${options.port}...`)
	)
}

module.exports = Object.assign({}, { start })
