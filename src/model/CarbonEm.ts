import { AbstractEntity } from './AbstractEntity'
import { DeepPartial, EntityManager, DeleteResult } from 'typeorm'
import { Carbon } from '../entity/Carbon'
import { getTotalCarbon } from '../helpers/utils'
import { ManagerSingleton } from './ManagerSingleton'

export class CarbonEm extends AbstractEntity {

    async findAll(header: string): Promise<Carbon[]>
    {
        return this.verifyAndGetEntitManger(header).find(Carbon, {relations: ['user', 'category']})
    }

    async find(header: string, id: string | number): Promise<Carbon>
    {
        return this.verifyAndGetEntitManger(header).findOneOrFail(Carbon, id, {relations: ['user', 'category']})
    }

    async findByUser(header: string, idUser: string | number): Promise<Carbon[]>
    {
        return this.verifyAndGetEntitManger(header).find(Carbon, {where: {user: {id: idUser}}, relations: ['category']})
    }

    async findByUserCategory(header: string, idUser: string | number, idCategory: string | number): Promise<Carbon[]>
    {
        return (await this.findByUser(header, idUser)).filter((carbon: Carbon) => carbon.category.id == idCategory)
    }

    async create(header: string, body: DeepPartial<Carbon>): Promise<Carbon>
    {
        const em: EntityManager =  this.verifyAndGetEntitManger(header)
        const carbon: Carbon = em.create(Carbon, body)
        carbon.category = await ManagerSingleton.getCarbonCategoryInstance().find(header, body.category.id)
        carbon.user = await ManagerSingleton.getUserInstance().find(header, body.user.id)
        return em.save(carbon)
    }
    
    async update(header: string, id: string, body: DeepPartial<Carbon>): Promise<Carbon>
    {
        const em: EntityManager = this.verifyAndGetEntitManger(header)
        const carbon: Carbon = await em.findOne(Carbon, id)
        carbon.category = await ManagerSingleton.getCarbonCategoryInstance().find(header, body.category.id)
        carbon.user = await ManagerSingleton.getUserInstance().find(header, body.user.id)
        em.merge(Carbon, carbon, body)
        return em.save(carbon)
    }

    async remove(header: string, id: string): Promise<DeleteResult>
    {
        return this.verifyAndGetEntitManger(header).delete(Carbon, id)
    }

    async getTotalCarbonByUser(header: string, idUser: string | number): Promise<{g:number, tone:number}>
    {
        return getTotalCarbon(await this.findByUser(header, idUser))
    }

    async getTotalCarbonByCategory(header: string, idUser: string | number, idCategory: string | number): Promise<{g:number, tone:number}>
    {
        return getTotalCarbon(await this.findByUserCategory(header, idUser, idCategory))
    }
}