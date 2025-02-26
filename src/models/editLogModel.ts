import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("edit_logs")
export class EditLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tableName!: string; // e.g., "groups"

  @Column()
  recordId!: number; // ID of the record changed

  @Column()
  fieldName!: string; // Field that changed (e.g., "name")

  @Column({ nullable: true })
  oldValue?: string;

  @Column({ nullable: true })
  newValue?: string;

  @Column()
  changedBy!: string; // User who made the change (placeholder for now)

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  changedAt!: Date;
}