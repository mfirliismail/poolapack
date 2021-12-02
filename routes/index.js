const router = require('express').Router()
const countryRoute = require('./countries')
const sportRoute = require('./sport')
const athleteRoute = require('./athletes')

router.use('/countries', countryRoute)
router.use('/sports', sportRoute)
router.use('/athletes', athleteRoute)


module.exports = router