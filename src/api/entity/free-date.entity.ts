import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Day } from './day.entity';

@Entity()
export class FreeDate {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'datetime' })
    date!: Date;

    @ManyToOne(() => Day, day => day.freeDates)
    day!: Day;

    @Column({ type: "varchar", default: "" })
    event?: string;
    
    @Column({ type:"boolean", default: false })
    busy !: boolean
}
