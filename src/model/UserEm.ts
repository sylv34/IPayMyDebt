import { AbstractEntity } from './AbstractEntity'
import { User } from '../entity/User'
import { DeepPartial, EntityManager, DeleteResult } from 'typeorm'
import { ManagerSingleton } from './ManagerSingleton'

export class UserEm extends AbstractEntity {

    async findAll(header: string): Promise<User[]>
    {
        return this.verifyAndGetEntitManger(header).find(User, {relations: ['family']})
    }

    async find(header: string, id: string | number): Promise<User>
    {
        return this.verifyAndGetEntitManger(header).findOneOrFail(User, id, {relations: ['family']})
    }

    async findByEmail(email: string): Promise<User>
    {
        return this.getEntityManager().findOneOrFail(User, { where: {email: email}})
    }

    async create(header: string, body: DeepPartial<User>): Promise<User>
    {
        const em: EntityManager =  this.verifyAndGetEntitManger(header)
        const user: User = em.create(User, body)
        user.family = await ManagerSingleton.getFamilyInstance().find(header, body.family.id)
        return em.save(user)
    }

    async update(header: string, id: string, body: DeepPartial<User>): Promise<User>
    {
        const em: EntityManager = this.verifyAndGetEntitManger(header)
        const user: User = await em.findOne(User, id)
        user.family = await ManagerSingleton.getFamilyInstance().find(header, body.family.id)
        em.merge(User, user, body)
        return em.save(user)
    }

    async remove(header: string, id: string): Promise<DeleteResult>
    {
        return this.verifyAndGetEntitManger(header).delete(User, id)
    }
}