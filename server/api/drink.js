const { Router } = require('express');
const router = Router();
const {
    db,
    models: {Drink}
} = require("../db")


// This router is mounted at /api/drink

// add a drink
router.post('/', async(req, res, next) => {
    const name = req.body.name
    const brand = req.body.brand
    const type = req.body.type
    const price = req.body.price
    const amount = req.body.amount
    try {
        const drinkToCreate = await Drink.create(name, brand, type, price, amount)
        res.send(drinkToCreate)
    }
    catch (ex) {
        next(ex)
    }
});

// update single drink
router.put('/:id', async(req, res, next) => {
    const drinkId = req.params.id
    const name = req.body.name
    const brand = req.body.brand
    const type = req.body.type
    const price = req.body.price
    const amount = req.body.amount
    try {
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

// delete drink
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