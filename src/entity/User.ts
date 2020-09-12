import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm'
import { Family } from './Family'
import { Carbon } from './Carbon'
import { Car } from './Car'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    password: string

    @Column()
    email: string

    @Column()
    startKm: number
    
    @Column()
    endKm: number

    token: string

    @ManyToOne(() => Family, family => family.users)
    family: Family

    @OneToMany(() => Carbon, carbon => carbon.user)
    carbons: Carbon[]

    @OneToMany(() => Car, car => car.user)
    cars: Car[]
}
