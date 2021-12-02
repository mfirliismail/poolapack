const router = require('express').Router()
const countryController = require('../controllers/countries')

router.post('/', countryController.create)
router.get('/', countryController.readAllCountry)
router.put('/:id', countryController.updateCountry)
router.delete('/:id', countryController.deleteCountry)

module.exports = router