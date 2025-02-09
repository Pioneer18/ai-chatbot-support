import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async onModuleInit() {
    await this.runSQLScript();
  }

  private async runSQLScript() {
    try {
      const sqlFilePath = path.join(__dirname, 'init-db.sql');

      const sql = fs.readFileSync(sqlFilePath, 'utf-8');

      await this.dataSource.query(sql);
      
      console.log('SQL script executed successfully!');
    } catch (error) {
      console.error('Error executing SQL script:', error);
    }
  }
}
