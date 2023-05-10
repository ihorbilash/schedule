import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ type: 'varchar' })
    phone_number!: string
   
    @Column({ type: 'text' })
    event_description!: string
    
}