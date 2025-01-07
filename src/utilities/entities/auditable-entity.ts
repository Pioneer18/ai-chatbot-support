import {  Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class AuditableEntity {
 @CreateDateColumn({ type: 'timestamp without time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updated_at: Date;
}
