require('dotenv').config()
const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require ('../models/User')
const router = Router()

// /api/auth/register
router.post('/register',
[
    check('login', 'Некорректный логин').isLength({min:5}),
    check('lastname', 'Ваш статус не указан').exists(),
    check('firstname', 'Ваш статус не указан').exists(),
    check('fathername', 'Не указано отчество').exists(),
    check('password', 'Пароль должен содержать более 5 символов').isLength({min: 5}),
],
 async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные при регистрации"
            })
        }
        const {login, lastname, firstname, fathername, password} = req.body

        const candidate = await User.findOne({login})
        if (candidate) {
            return res.status(400).json({message: 'Такой пользователь уже существует'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const fio = lastname + ' ' + firstname[0] + '.' + fathername[0] + '.'
        const user = new User({login, lastname, firstname, fathername, fio, password: hashedPassword })
        await user.save()

        res.status(201).json({message: 'Пользователь успешно создан'})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова'})
    }
})

// /api/auth/login
router.post('/login',
[
    check('login', 'Введите корректный логин').isLength({min:5}),
    check('password', 'Введите пароль').exists()
],
 async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные при входе в систему"
            })
        }

        const {login, password} = req.body

        const user = await User.findOne({login})
        if (!user) {
            return res.status(400).json({message: "Пользователь не найден"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message: "Неверный пароль, попробуйте снова"})
        }

        const token = jwt.sign(
            { userId: user.id, firstname: user.firstname, fio: user.fio, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '10h' }
        )
     
        res.json({token, userId: user.id, firstname: user.firstname, fio: user.fio,  role: user.role})


    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова'})
    }
})

module.exports = router