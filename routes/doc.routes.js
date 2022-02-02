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


// /api/doc/upload
router.post('/upload', 
    fileMiddleware.single('npa_document'), 
    async(req, res) => {
    //здесь будет обрабатываться посланная, с формы создания запроса, информация
    try {
        const {doctype, status} = req.body
    
        let title = req.file.originalname.slice(0, -4)
        let path = req.file.path.replace(/ /g, '%20')
        let link = './' + path.slice(19)

       // console.log(doctype + " " + status + " " + link + " " + title)

        if (req.file) {
            file = req.file
                const doc = new Doc({title, doctype, link, status})
                doc.save()
            res.json({file, message: "Документ успешно сохранен"})
        }

    } catch (e) {
        res.json({message: 'Что-то пошло не так попробуйте снова'})
    }
})



router.get('/', async(req, res) => {
    // const role = req.user.role
    // const creatorid = req.user.userId

    try {
            const docs = await Doc.find({}).sort('status') // search all bids
            res.json(docs)    
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова'})
    }
})



module.exports = router