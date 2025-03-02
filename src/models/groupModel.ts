import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("groups")
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true }) // No duplicate group names
  name!: string;

  // Remove or modify the category field to reference the Categories table
  @Column({ type: "int", nullable: true }) // Foreign key to Category.id (optional)
  categoryId?: number;

  @Column({ default: true }) // Active by default
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;


  // Virtual properties for TypeScript typing (not stored in the database)
  category?: string; // Virtual property for category name (e.g., "Family")
  categoryType?: string; // Virtual property for category type (e.g., "Group")
  isMandatory?: boolean; // Virtual property for mandatory status
}