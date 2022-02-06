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
            const users = await User.find({active: true}).sort('department').sort('lastname') // search all
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
            const users = await User.find({department: department}).sort('lastname') // search all bids
            res.json(users)            
        
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова'})
    }
})


router.post('/markdepartment', auth, async(req, res) => {
    
    const todayDate = new Date()
    const date = todayDate.getFullYear() + "_" + (todayDate.getMonth() + 1) + "_" + todayDate.getDate()
    // console.log(date);
    // const date = "2022_1_20"
    
    try {
        // забираем присланные данные
        const {form, detail} = req.body
        // Считаем сколько строк нужно обработать
        const arrNumber = Object.keys(form).length
        // и запускаем цикл по этому колличеству
        for (let i = 0; i < arrNumber; i++) {
            // в каждой интерации мы определяем ключ объекта, потому что сохранение
            // может происходить без арифметического порядка и присваиваем этот ключ переменной
          let markArrayIndex = Object.keys(form)[i]
          // создаем временные переменные, обращаясь напрямую к элементам массива
            let mark_userid = form[markArrayIndex].userid
            let mark_userstatus = form[markArrayIndex].status
            // в случае с примечанием требуется проверка существования
            // если массив существует - обращаемся к элементу
            // если нет - присваиваем переменной значение "-"
            let mark_userdetail
            if (typeof detail[markArrayIndex] === 'undefined') {
                mark_userdetail = "-"
            } else {
                mark_userdetail = detail[markArrayIndex].userdetail
            }
            let mark_date = date

            // Находим пользователя с указанным ID
            User.findOne({ '_id': mark_userid }, '_id mark', function (err, person) {
                let updateMarkUserId
                let checkMarkDate = 0

                // Проверяем есть ли объекты в поле Марк и каково их количество
                if (Object.keys(person.mark).length === 0){
                    // Если их нет и количество равно 0, то пушим введенные данные
                    User.findById(mark_userid, function (err, user) {
                        console.log("Это точно эта фигня")
                        user.mark.push({date: mark_date, status: mark_userstatus, detail: mark_userdetail})
                        user.save()
                        }) 
                } else {
                    
                    // если объектов в Марк больше 0, то включаем цикл перебора
                    for (let y = 0; y < Object.keys(person.mark).length; y++){
                        // в каждом объекте ищется соответствие сегодняшней даты и даты в объекте
                        if (person.mark[y].date === mark_date) {
                            // Если дата совпала - вносим изменения в найденный объект mark Юзера
                                User.findById(mark_userid, function (err, user) {
                                user.mark.set(y,{date:mark_date, status: mark_userstatus, detail: mark_userdetail})
                                user.save()
                                }) 
                                // Добавляем к нашему костылю +1, чтобы отметить запись данных внутри цикла
                                checkMarkDate = checkMarkDate + 1
                        } 
                    } 
                    // Костыль для проверки окончания перебора всех объеков mark юзера
                    checkMarkDate = checkMarkDate + 1

                }
                // если в checkMarkDate у нас получается число 1, это значит что среди элементов массивов
                // не найдены совпадения по выбранной дате и мы пушим новые данные
                if (checkMarkDate === 1) {
                    User.findById(mark_userid, function (err, user) {
                       user.mark.push({date: mark_date, status: mark_userstatus, detail: mark_userdetail})
                       user.save()
                    }) 
               }
            });

        }
          
        res.status(200).json({message: 'Данные успешно сохранены'})     
    
} catch (e) {
    res.status(500).json({message: 'Возникли ошибки'})
}
})



module.exports = router