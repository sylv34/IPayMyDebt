import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm'
import { CarKm } from './CarKm'
import { User } from './User'

@Entity()
export class Car {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    brand: string

    @Column()
    model: string

    @Column()
    gCo2ByKm: number

    @ManyToOne(() => User, user => user.cars)
    user: User

    @OneToMany(() => CarKm, carKm => carKm.car)
    carKms: CarKm[]
}
