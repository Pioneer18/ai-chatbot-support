import {  Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class AuditableEntity {
 @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
