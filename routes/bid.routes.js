require('dotenv').config()
const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require ('../models/User')
const Bid = require ('../models/Bid')
const Message = require('../models/Message')
const auth = require ('../middleware/auth.middleware')
const router = Router()

// /api/bid/create
router.post('/create', 
[
    check('title', 'Не выбрана причина заявки').exists({checkFalsy: true}),
    check('createmessage', 'Опишите причину вызова').exists({checkFalsy: true}),
    check('department', 'Не выбран отдел').exists({checkFalsy: true}),
    check('cabinetnumber', 'Напишите номер кабинета').exists({checkFalsy: true}),
    check('creator', 'Введите ваше имя и фамилию').exists({checkFalsy: true})
], 
    async(req, res) => {
    //здесь будет обрабатываться посланная, с формы создания запроса, информация
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const allerror = errors.array() 
            return res.status(400).json({
                errors: allerror,
                message: allerror[0].msg
            })
        }
        const {title, createmessage, department, cabinetnumber, creator} = req.body
        const bid = new Bid({title, createmessage, department, cabinetnumber, creator})
        await bid.save()

        const idForAdmin = bid._id
        const linkForAdmin = process.env.BASE_URL + '/detail/' + idForAdmin
        const detailForAdmin = `Создана заявка №${idForAdmin} от ${creator} отделения ${department}.`
        const titleForAdmin = title

        const messageForAdmin = new Message({title: titleForAdmin, link: linkForAdmin, detail: detailForAdmin})
        const result = await messageForAdmin.save()
        await User.updateMany({"role": 'admin'}, {"message": result})
        console.log(result)

        // await User.updateMany({"role": 'admin'}, {"message.id": idForAdmin, "message.status": true, "message.title": titleForAdmin, "message.link": linkForAdmin, "message.detail": detailForAdmin})

        res.status(201).json({bid, message: "Заявка успешно создана"})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова'})
    }
})

router.get('/', auth, async(req, res) => {
    try {
        const bids = await Bid.find({}) // search all bids
        res.json(bids)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова'})
    }
})


router.get('/:id', auth, async(req, res) => {
    try {
        const bid = await Bid.findById(req.params.id)
        res.json(bid)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова'})
    }
})

module.exports = router