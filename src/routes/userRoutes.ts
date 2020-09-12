import {Router} from 'express'
import { findAll, find, create, update, remove } from '../controler/userController'

export const userRouter = ():Router => Router()
    .get('/', findAll)
    .get('/:id', find)
    .post('/', create)
    .put('/:id', update)
    .delete('/:id', remove)