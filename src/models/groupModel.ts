import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("groups")
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true }) // No duplicate group names
  name!: string;

  @Column({ nullable: true }) // Optional category
  category?: string;

  @Column({ default: true }) // Active by default
  isActive!: boolean;
}