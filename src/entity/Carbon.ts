import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm'
import { User } from './User'
import { CarbonCategory } from './CarbonCategory'

@Entity()
export class Carbon {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    createdDate: Date;

    @Column()
    name: string

    @Column()
    gco2: number

    @ManyToOne(() => User, user => user.carbons)
    user: User;

    @ManyToOne(() => CarbonCategory, category => category.carbons)
    category: CarbonCategory
}
