require('dotenv').config()
const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require ('../models/User')
const Bid = require ('../models/Bid')
const router = Router()
const ip = require ('ip')

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
            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные заявки"
            })
        }
        const {title, createmessage, department, cabinetnumber, creator} = req.body
        const bid = new Bid({title, createmessage, department, cabinetnumber, creator})
        await bid.save()

        res.status(201).json({message: "Заявка успешно создана"})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова'})
    }
})

module.exports = router