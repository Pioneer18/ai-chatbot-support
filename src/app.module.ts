import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { AiService } from './ai/ai.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from './patients/patients.module';
import { PhysiciansModule } from './physicians/physicians.module';
import { SymptomConditionMappingModule } from './symptom-condition-mapping/symptom-condition-mapping.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PrescriptionModule } from './prescription/prescription.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      autoLoadEntities: true,
    }),
    ChatModule,
    AuthModule,
    UsersModule,
    PatientsModule,
    PhysiciansModule,
    SymptomConditionMappingModule,
    AppointmentsModule,
    PrescriptionModule],
  controllers: [AppController],
  providers: [AppService, AiService],
})
export class AppModule {}
