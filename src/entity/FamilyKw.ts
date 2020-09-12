import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm'
import { Family } from './Family'

@Entity()
export class FamilyKw {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    datePick: Date

    @Column()
    kwStart: number

    @Column({nullable: true})
    kwEnd: number

    @ManyToOne(() => Family, family => family.familyKws)
    family: Family
}
