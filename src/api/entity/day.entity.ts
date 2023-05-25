import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FreeDate } from './free-date.entity';

@Entity()
export class Day {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'datetime' })
  date!: Date;

  @Column({ type: 'boolean', default: true })
  availability!: boolean;

 /* @Column({ type: 'integer' })
  week!: number;

  @Column({ type: 'integer' })
  month!: number;
*/

  @OneToMany(() => FreeDate, freeDate => freeDate.day, { cascade: true })
  freeDates!: FreeDate[];
}
