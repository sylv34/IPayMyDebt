import { AbstractEntity } from './AbstractEntity'
import { DeepPartial, EntityManager, DeleteResult } from 'typeorm'
import { CarbonCategory } from '../entity/CarbonCategory'

export class CarbonCategoryEm extends AbstractEntity {

    async findAll(header: string): Promise<CarbonCategory[]>
    {
        return this.verifyAndGetEntitManger(header).find(CarbonCategory)
    }

    async find(header: string, id: string | number): Promise<CarbonCategory>
    {
        return this.verifyAndGetEntitManger(header).findOneOrFail(CarbonCategory, id)
    }
    async findByName(header: string, nameCat: string): Promise<CarbonCategory>
    {
        return this.verifyAndGetEntitManger(header).findOne(CarbonCategory, {where: {name: nameCat}})
    }
    async create(header: string, body: DeepPartial<CarbonCategory>): Promise<CarbonCategory>
    {
        const em: EntityManager =  this.verifyAndGetEntitManger(header)
        const category: CarbonCategory = em.create(CarbonCategory, body)
        return em.save(category)
    }

    async update(header: string, id: string, body: DeepPartial<CarbonCategory>): Promise<CarbonCategory>
    {
        const em: EntityManager = this.verifyAndGetEntitManger(header)
        const category: CarbonCategory = await em.findOne(CarbonCategory, id)
        em.merge(CarbonCategory, category, body)
        return em.save(category)
    }

    async remove(header: string, id: string): Promise<DeleteResult>
    {
        return this.verifyAndGetEntitManger(header).delete(CarbonCategory, id)
    }
}