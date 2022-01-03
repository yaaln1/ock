require('dotenv').config()
const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult, Result} = require('express-validator')
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
        // создается заявка со страницы CreatePage
        const {title, createmessage, department, creator, creatorId} = req.body
        //создаем свой manualid для удобства
        const datenow = new Date()
        const manualid = Date.parse(datenow)
        console.log("manual - " + manualid)
        const bid = new Bid({manualid, title, createmessage, department, creator, creatorId})
        await bid.save()
        // Заявка сохранена

        // Собираем сообщение для администраторов о созданной заявке
        // добавляем ссылку на детальную страницу заявки и готовим шаблон сообщения
        const linkForAdmin = process.env.HOME_URL + '/detail/' + bid._id
        const detailForAdmin = `Создана заявка №${manualid} от ${creator} отделения ${department}.`
        // Все готово - сохраняем новое сообщение в базу данных
        const messageForAdmin = new Message({title, link: linkForAdmin, detail: detailForAdmin})
        const result = await messageForAdmin.save()
        // в переменной result сохранено сообщение, которое мы отправим каждому администратору        

        // Не придумал ничего лучше, чем собрать Id всех админов
        const adminusers = await User.find({ role: 'admin' }, '_id')
        // и с помощью map сделать запись о новом сообщении каждому
        adminusers.map((oneuser) => {
                User.findById(oneuser._id, function (err, user) {
                user.message.push(result)
                user.save()
                })
        })
        // отправляем результат для перехода на детальную страницу заявки 
        // и сообщение о успешной записи заявки в бд 
        bidId = bid._id
        res.status(201).json({bidId, message: "Заявка успешно создана"})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова'})
    }
})

router.get('/', auth, async(req, res) => {
    const role = req.user.role
    const creatorid = req.user.userId

    try {
        if (role === "admin") {
            const bids = await Bid.find({}) // search all bids
            res.json(bids)
        } else if (role === "user") {
            const bids = await Bid.find({creatorId: creatorid}) // search all bids
            res.json(bids)
        }
            
        
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


router.post('/start', async(req, res) => {
    try {
        const {id, status, executor} = req.body
        if (status === "new") {
            newstatus = "inwork"
            await Bid.findByIdAndUpdate(id, { status: newstatus })
            return res.status(201).json({message: "Вы начали выполнять заявку"})
            
        } else if (status === "inwork") {
            newstatus = "done"
            const datenow = Date.now()
            await Bid.findByIdAndUpdate(id, { status: newstatus, completetime: datenow, executor: executor })
            return res.status(201).json({message: "Заявка выполнена"})
            
        } else if (status === "done") {
            newstatus = "complete"
            const datenow = Date.now()
            await Bid.findByIdAndUpdate(id, { status: newstatus, fullcompletetime: datenow })
            return res.status(201).json({message: "Выполнение подтверждено"})
            
        }
        
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова'})
    }
})

module.exports = router