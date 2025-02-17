import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseService } from "./database.service";

@Module({
    imports:[
        TypeOrmModule.forRoot({
              type: 'postgres',
              host: 'postgres',
              port: Number(process.env.DB_PORT),
              username: process.env.POSTGRES_USER,
              password: process.env.POSTGRES_PASSWORD,
              database: process.env.POSTGRES_DB,
              autoLoadEntities: true,
        }),
    ],
    providers: [DatabaseService],
    exports: [DatabaseService, TypeOrmModule]
})
export class DatabaseModule {}