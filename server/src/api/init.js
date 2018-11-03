const axios = require('axios')

const { axiosConfig } = require('../config')

const instance = axios.create(axiosConfig)

// Basiq API cannot accept default accept header from axios of 'application/json, text/plain, */*'
instance.defaults.headers.common.accept = 'application/json'

module.exports = instance
