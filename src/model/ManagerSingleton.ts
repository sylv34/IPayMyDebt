import { CarbonCategoryEm } from './CarbonCategoryEm'
import { CarbonEm } from './CarbonEm'
import { CarEm } from './CarEm'
import { FamilyEm } from './FamilyEm'
import { UserEm } from './UserEm'


export abstract class ManagerSingleton {

    private static userEmInstance: UserEm
    private static familyEmInstance: FamilyEm
    private static carbonEmInstance: CarbonEm
    private static carbonCategoryInstance: CarbonCategoryEm
    private static carInstance: CarEm


    static getUserInstance(): UserEm
    {
        if (this.userEmInstance === undefined) {
            this.userEmInstance = new UserEm()
        }   
        return this.userEmInstance
    }

    static getFamilyInstance(): FamilyEm
    {
        if (this.familyEmInstance === undefined) {
            this.familyEmInstance = new FamilyEm()
        }   
        return this.familyEmInstance
    }

    static getCarbonInstance(): CarbonEm
    {
        if (this.carbonEmInstance === undefined) {
            this.carbonEmInstance = new CarbonEm()
        }   
        return this.carbonEmInstance
    }

    static getCarbonCategoryInstance(): CarbonCategoryEm
    {
        if (this.carbonCategoryInstance === undefined) {
            this.carbonCategoryInstance = new CarbonCategoryEm()
        }   
        return this.carbonCategoryInstance
    }

    static getCarInstance(): CarEm
    {
        if (this.carInstance === undefined) {
            this.carInstance = new CarEm()
        }   
        return this.carInstance
    }
    
}