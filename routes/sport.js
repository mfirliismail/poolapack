const router = require('express').Router()
const sportController = require('../controllers/sports')

router.post('/', sportController.create)
router.get('/', sportController.readAllSport)
router.put('/:id', sportController.updateSport)
router.delete('/:id', sportController.deleteSport)

module.exports = router