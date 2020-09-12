import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import { Carbon } from './Carbon'

@Entity()
export class CarbonCategory {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Carbon, carbon => carbon.category)
    carbons: Carbon[]
}