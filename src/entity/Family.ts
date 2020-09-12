import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import { FamilyKw } from './FamilyKw'
import { User } from './User'

@Entity()
export class Family {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => User, user => user.family)
    users: User[]

    @OneToMany(() => FamilyKw, familyKw => familyKw.family)
    familyKws: FamilyKw[]
}
