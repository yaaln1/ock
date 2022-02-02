require('dotenv').config()
const {Router} = require('express')
const jwt = require('jsonwebtoken')
const {check, validationResult, Result} = require('express-validator')
const multer = require("multer")
const User = require ('../models/User')
const Doc = require ('../models/Doc')
const auth = require ('../middleware/auth.middleware')
const fileMiddleware = require ('../middleware/file.middleware')
const router = Router()


router.get('/all', async(req, res) => {
    // const role = req.user.role
    // const creatorid = req.user.userId

    try {
            const users = await User.find({active: true}) // search all
            res.json(users)    
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова'})
    }
})

router.get('/mydepartment', auth, async(req, res) => {
    // const role = req.user.role
    // const creatorid = req.user.userId
    const department = req.user.department

    try {
            const users = await User.find({department: department}) // search all bids
            res.json(users)            
        
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова'})
    }
})


router.post('/markdepartment', auth, async(req, res) => {
    const result = req.body
    try {
       
            console.log(result[0].userid)
          

        res.status(200).json(result)     
    
} catch (e) {
    res.status(500).json({message: 'Что-то пошло не так попробуйте снова'})
}
})



module.exports = router