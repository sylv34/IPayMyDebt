import {Router} from 'express'
import { findAll, find, create, update, remove } from '../controler/carbonCategoryController'

export const carbonCategoryRouter = ():Router => Router()
    .get('/', findAll)
    .get('/:id', find)
    .post('/', create)
    .put('/:id', update)
    .delete('/:id', remove)