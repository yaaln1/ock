require('dotenv').config()
const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require ('../models/User')
const Bid = require ('../models/Bid')
const auth = require ('../middleware/auth.middleware')
const router = Router()




module.exports = router