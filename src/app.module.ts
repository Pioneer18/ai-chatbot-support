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
import { SymptomsModule } from './symptoms/symptoms.module';
import { ConditionsModule } from './conditions/conditions.module';
import { PatientConditionsModule } from './patient-conditions/patient-conditions.module';
import { PatientSymptomsModule } from './patient-symptoms/patient-symptoms.module';
import { SymptomConditionMappingModule } from './symptom-condition-mapping/symptom-condition-mapping.module';
import { PhysicianConditionsModule } from './physician-conditions/physician-conditions.module';
import { PhysicianSymptomsModule } from './physician-symptoms/physician-symptoms.module';
import { PatientPhysiciansModule } from './patient-physicians/patient-physicians.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { MedicationModule } from './medication/medication.module';
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
    SymptomsModule,
    ConditionsModule,
    PatientConditionsModule,
    PatientSymptomsModule,
    SymptomConditionMappingModule,
    PhysicianConditionsModule,
    PhysicianSymptomsModule,
    PatientPhysiciansModule,
    AppointmentsModule,
    MedicationModule,
    PrescriptionModule],
  controllers: [AppController],
  providers: [AppService, AiService],
})
export class AppModule {}
