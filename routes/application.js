const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/application')

const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove)
router.post('/', upload.single('formImages'), controller.create) //  passport.authenticate('jwt', {session: false})
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('formImages'), controller.update)


module.exports = router