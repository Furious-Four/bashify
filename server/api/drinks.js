const { Router } = require('express');
const router = Router();
const {
    db,
    models: {Drink}
} = require("../db")


// This router is mounted at /api/drinks

// router.get('/', async(req, res, next) => {
//     try {
//         const drinks = await Drink.findAll()
//         res.send(drinks)
//     }
//     catch (ex) {
//         next(ex)
//     }
// });

router.put('/:id', async(req, res, next) => {
    try {
        const drinkId = req.params.id
        const name = req.body.name
        const brand = req.body.brand
        const type = req.body.type
        const price = req.body.price
        const amount = req.body.amount
        const drinkToUpdate = await Drink.findByPk(drinkId)
        drinkToUpdate.name = name
        drinkToUpdate.brand = brand
        drinkToUpdate.type = type
        drinkToUpdate.price = price
        drinkToUpdate.amount = amount
        res.send(drinkToUpdate)
    }
    catch (ex) {
        next(ex)
    }
});

router.post('/', async(req, res, next) => {
    try {
        const name = req.body.name
        const brand = req.body.brand
        const type = req.body.type
        const price = req.body.price
        const amount = req.body.amount
        const drinkToCreate = await Drink.create(name, brand, type, price, amount)
        res.send(drinkToCreate)
    }
    catch (ex) {
        next(ex)
    }
});

router.delete('/:id', async(req, res, next) => {
    try {
        const drinkId = req.params.id
        const drinkToDelete = await Drink.findByPk(drinkId)
        await drinkToDelete.destroy()
        const drinks = Drink.findAll()
        res.send(drinks)
    }
    catch (ex) {
        next(ex)
    }
});

module.exports = router;