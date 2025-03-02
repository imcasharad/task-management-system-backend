import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { CategoryType } from "./categoryTypeModel";

@Entity("category_items")
export class CategoryItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  name!: string; // e.g., "Family", "Friends"

  @Column({
    type: "text",
    nullable: true,
  })
  description?: string; // Optional description for the category item

  @ManyToOne(() => CategoryType, (categoryType) => categoryType.id)
  @JoinColumn({ name: "categoryTypeId" })
  categoryType!: CategoryType; // Foreign key to CategoryType

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}