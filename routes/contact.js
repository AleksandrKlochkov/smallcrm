const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/contact')

const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/:id',  controller.getById) //passport.authenticate('jwt', {session: false}),
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove)
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('formImages'), controller.create)
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('formImages'), controller.update)


module.exports = router