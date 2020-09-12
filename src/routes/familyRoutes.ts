import {Router} from 'express'
import { findAll, find, create, update, remove, findUsers, addStartKw, addEndKw } from '../controler/familyController'

export const familyRouter = ():Router => Router()
    .get('/', findAll)
    .get('/:id/users', findUsers)
    .get('/:id', find)
    .post('/:id/kw/addstartkw', addStartKw)
    .post('/:id/kw/addendkw', addEndKw)
    .post('/', create)
    .put('/:id', update)
    .delete('/:id', remove)