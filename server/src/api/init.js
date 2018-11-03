const axios = require('axios')

const { axiosConfig } = require('../config')

const instance = axios.create(axiosConfig)

module.exports = instance
