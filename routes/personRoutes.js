const router = require('express').Router()

const { restart } = require('nodemon')
const Person = require('../models/Person')

router.post('/', async (req, res) => {
    
    const {name, salary, approved} = req.body

    if(!name){
        res.status(422).json({error: 'O nome é obrigatório'})
    }
      
    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person)
        res.status(201).json({message: 'Pessoa inserida com sucesso'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/', async (req, res) => {

    try {
        const people = await Person.find()

        res.status(200).json({people})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {

    const id = req.params.id
    
    try {
        const people = await Person.findOne({_id: id})

        if(!people){
            res.status(422).json({message: 'O Usuário não foi encontrado'})
            return
        }

        res.status(200).json({people})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.patch('/:id', async (req, res) => {
    
    const {name, salary, approved} = req.body
    const id = req.params.id

    if(!name){
        res.status(422).json({error: 'O nome é obrigatório'})
    }
      
    const person = {
        name,
        salary,
        approved
    }

    try {
        const updatePerson = await Person.updateOne({_id: id}, person)

        if(updatePerson.matchedCount == 0){
            res.status(422).json({ message: 'O Usuário não foi encontrado'})
            return
        }
        
        res.status(200).json(updatePerson)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.delete('/:id', async (req, res) => {

    const id = req.params.id

    try {
        const people = await Person.findOne({_id: id})

        if(!people){
            res.status(422).json({message: 'O Usuário não foi encontrado'})
            return
        }

        await Person.deleteOne({_id: id})

        res.status(200).json({people})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router

