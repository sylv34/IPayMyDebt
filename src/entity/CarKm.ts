import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm'
import { Car } from './Car'

@Entity()
export class CarKm {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    datePick: Date

    @Column()
    kmStart: number

    @Column({nullable: true})
    kmEnd: number

    @ManyToOne(() => Car, car => car.carKms)
    car: Car
}
