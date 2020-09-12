import { AbstractEntity } from './AbstractEntity'
import { DeepPartial, EntityManager, DeleteResult, IsNull } from 'typeorm'
import { Family } from '../entity/Family'
import { User } from '../entity/User'
import { FamilyKw } from '../entity/FamilyKw'
import { Carbon } from '../entity/Carbon'
import { ManagerSingleton } from './ManagerSingleton'
import { getgCo2Kw } from '../helpers/utils'

export class FamilyEm extends AbstractEntity {

    async findAll(header: string): Promise<Family[]>
    {
        return this.verifyAndGetEntitManger(header).find(Family, {relations: ['users']})
    }

    async find(header: string, id: string | number): Promise<Family>
    {
        return this.verifyAndGetEntitManger(header).findOneOrFail(Family, id, {relations: ['users']})
    }

    async findUsers(header: string, id: string | number): Promise<User[]>
    {
        return (await this.verifyAndGetEntitManger(header).findOneOrFail(Family, id, {relations: ['users']})).users
    }
    
    async create(header: string, body: DeepPartial<Family>): Promise<Family>
    {
        const em: EntityManager =  this.verifyAndGetEntitManger(header)
        const family: Family = em.create(Family, body)
        return em.save(family)
    }

    async update(header: string, id: string, body: DeepPartial<Family>): Promise<Family>
    {
        const em: EntityManager = this.verifyAndGetEntitManger(header)
        const family: Family = await em.findOne(Family, id)
        em.merge(Family, family, body)
        return em.save(family)
    }

    async remove(header: string, id: string): Promise<DeleteResult>
    {
        return this.verifyAndGetEntitManger(header).delete(Family, id)
    }

    async addStartKw(header: string, id: string | number, kw: number): Promise<FamilyKw>
    {
        const familyKw: FamilyKw = new FamilyKw()
        familyKw.kwStart = kw
        familyKw.datePick = new Date()
        familyKw.family = await this.find(header, id)
        return this.getEntityManager().save(FamilyKw, familyKw)
    }

    async addEndKw(header: string, id: string | number, kw: number): Promise<Carbon>
    {
        const family: Family = await this.find(header, id)
        const em: EntityManager = this.getEntityManager()

        const familyKw: FamilyKw = await this.verifyAndGetEntitManger(header).findOneOrFail(FamilyKw, {where: {kmEnd: IsNull(), user: family.users[0]}})
        familyKw.kwEnd = kw
        em.save(FamilyKw, familyKw)
        
        const carbon: Carbon = new Carbon()
        carbon.category = await ManagerSingleton.getCarbonCategoryInstance().findByName(header, 'Electricité')
        carbon.createdDate = new Date()
        carbon.name = `Electricité de ${family.name}`
        console.log(familyKw.kwStart)
        carbon.gco2 = getgCo2Kw(kw - familyKw.kwStart)
        carbon.user = family.users[0]
        
        const familyKwNew: FamilyKw = new FamilyKw()
        familyKwNew.kwStart = kw
        familyKwNew.datePick = new Date()
        familyKwNew.family = family

        em.save(em.create(FamilyKw, familyKwNew))

        return ManagerSingleton.getCarbonInstance().create(header, carbon)
    }
}