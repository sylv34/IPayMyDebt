import { AbstractEntity } from './AbstractEntity'
import { DeepPartial, EntityManager, DeleteResult, IsNull } from 'typeorm'
import { Carbon } from '../entity/Carbon'
import { getCarFullName, getgCo2Km } from '../helpers/utils'
import { ManagerSingleton } from './ManagerSingleton'
import { User } from '../entity/User'
import { Car } from '../entity/Car'
import { CarKm } from '../entity/CarKm'

export class CarEm extends AbstractEntity {

    
    async findAllByUser(header: string, idUser: string | number): Promise<Car[]>
    {
        return (await this.verifyAndGetEntitManger(header).findOneOrFail(User, idUser, {relations: ['cars']})).cars
    }

    async find(header: string, id: string | number): Promise<Car>
    {
        return this.verifyAndGetEntitManger(header).findOneOrFail(Car, id, {relations: ['user']})
    }

    async create(header: string, body: DeepPartial<Car>): Promise<Car>
    {
        const em: EntityManager =  this.verifyAndGetEntitManger(header)
        const car: Car = em.create(Car, body)
        return em.save(car)
    }

    async update(header: string, id: string, body: DeepPartial<Car>): Promise<Car>
    {
        const em: EntityManager = this.verifyAndGetEntitManger(header)
        const car: Car = await em.findOne(Car, id)
        em.merge(Car, car, body)
        return em.save(car)
    }

    async remove(header: string, id: string): Promise<DeleteResult>
    {
        return this.verifyAndGetEntitManger(header).delete(Car, id)
    }

    async addStartKm(header: string, id: string | number, km: number): Promise<CarKm>
    {
        const carKm: CarKm = new CarKm()
        carKm.kmStart = km
        carKm.datePick = new Date()
        carKm.car = await this.find(header, id)
        return this.getEntityManager().save(CarKm, carKm)
    }

    async addEndKm(header: string, id: string | number, km: number): Promise<Carbon>
    {
        const car: Car = await this.find(header, id)
        const em: EntityManager = this.getEntityManager()

        const carKm: CarKm = await this.verifyAndGetEntitManger(header).findOneOrFail(CarKm, {where: {kmEnd: IsNull(), user: car.user}})
        carKm.kmEnd = km
        em.save(CarKm, carKm)
        
        const carbon: Carbon = new Carbon()
        carbon.category = await ManagerSingleton.getCarbonCategoryInstance().findByName(header, 'Carburant')
        carbon.createdDate = new Date()
        carbon.name = `Carburant de ${getCarFullName(car)}`
        carbon.gco2 = getgCo2Km(km - carKm.kmStart, car)
        carbon.user = car.user
        
        const carKmNew: CarKm = new CarKm()
        carKmNew.kmStart = km
        carKmNew.datePick = new Date()
        carKmNew.car = car

        em.save(em.create(CarKm, carKmNew))

        return ManagerSingleton.getCarbonInstance().create(header, carbon)
    }
}