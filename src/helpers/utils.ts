import { Car } from '../entity/Car'
import { Carbon } from '../entity/Carbon'

export const getTotalCarbon = (carbons: Carbon[]): {g:number, tone:number} => {
    let total = 0
    carbons.forEach((carbon: Carbon) => total += carbon.gco2)
    return {g: total, tone: getToneToGramme(total)}
}

export const getgCo2Km = (km: number, car: Car): number => car.gCo2ByKm * km

export const getgCo2Kw = (kw: number): number => 150 * kw

export const getToneToGramme = (gr: number): number => gr / 1000000

export const getCarFullName = (car: Car): string => `${car.brand} ${car.model}`