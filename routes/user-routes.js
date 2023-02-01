const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()

const User = require('../models/user')
const { createUserToken } = require('../config/auth')

router.post('/sign-up', (req, res, next) => {
	bcrypt
		.hash(req.body.credentials.password, 10)
		.then((hash) =>
			({
				email: req.body.credentials.email,
				password: hash,
			})
		)
		.then((user) => User.create(user))
		.then((user) => res.status(201).json(user))
		.catch(next)
})

router.post('/sign-in', (req, res, next) => {
	User.findOne({ email: req.body.credentials.email })
		.then((user) => createUserToken(req, user))
		.then((token) => res.json({ token: token }))
		.catch(next)
});

module.exports = router
