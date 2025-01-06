import {  Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class AuditableEntity {
 @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
