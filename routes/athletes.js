const router = require('express').Router()
const athleteController = require('../controllers/Athletes')


router.post('/', athleteController.create)
router.get('/', athleteController.readAllAthletes)
router.get('/country/:country', athleteController.filterYearAthletes)
router.get('/country/:country/date', athleteController.filterDateAthletes)
router.get('/sports', athleteController.filterSports)
router.put('/:id', athleteController.updateAthletes)
router.delete('/:id', athleteController.deleteAthletes)


module.exports = router