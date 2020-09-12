import {Router} from 'express'
import { addEndKm, addStartKm, create, find, findAllByUser, remove, update } from '../controler/carController'

export const carRouter = ():Router => Router()
    .get('/user/:idUser', findAllByUser)
    .get('/:id', find)
    .post('/:id/km/addstartkm', addStartKm)
    .post('/:id/km/addendkm', addEndKm)
    .post('/', create)
    .put('/:id', update)
    .delete('/:id', remove)