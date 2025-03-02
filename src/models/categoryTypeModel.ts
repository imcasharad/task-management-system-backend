import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("category_types")
export class CategoryType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 50,
    unique: true,
  })
  name!: string; // e.g., "Group", "Client"

  @Column({
    type: "boolean",
    default: false,
  })
  isMandatory!: boolean; // Toggle for mandatory/non-mandatory at type level

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}