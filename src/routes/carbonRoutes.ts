import {Router} from 'express'
import { findAll, find, create, update, remove, findAllByUser, findAllByCategory, totalCarbonByUser, totalCarbonByUserCategory } from '../controler/carbonController'

export const carbonRouter = ():Router => Router()
    .get('/', findAll)
    .get('/user/:idUser', findAllByUser)
    .get('/user/:idUser/category/:idCategory', findAllByCategory)
    .get('/user/:idUser/total', totalCarbonByUser)
    .get('/user/:idUser/category/:idCategory/total', totalCarbonByUserCategory)
    .get('/:id', find)
    .post('/', create)
    .put('/:id', update)
    .delete('/:id', remove)