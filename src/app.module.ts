import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from './patients/patients.module';
import { PhysiciansModule } from './physicians/physicians.module';
import { SymptomConditionMappingModule } from './symptom-condition-mapping/symptom-condition-mapping.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { ChatController } from './chat/chat/chat.controller';
import { AuthController } from './auth/controller/auth.controller';
import { PatientsController } from './patients/patients.controller';
import { PhysiciansController } from './physicians/physicians.controller';
import { PrescriptionController } from './prescription/prescription.controller';
import { SymptomConditionMappingController } from './symptom-condition-mapping/symptom-condition-mapping.controller';
import { UsersController } from './users/controller/users.controller';
import { RedisModule } from './redis/redis.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './common/filters/http-error.filter';
import { LoggingInterceptor } from './common/interceptors/logging-interceptor';
import { ErrorFilter } from './common/filters/error.filters';

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
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true
    }),
    ChatModule,
    AuthModule,
    UsersModule,
    PatientsModule,
    PhysiciansModule,
    SymptomConditionMappingModule,
    AppointmentsModule,
    PrescriptionModule,
    RedisModule
  ],
  controllers: [
    AppController,
    AuthController,
    ChatController,
    PatientsController,
    PhysiciansController,
    PrescriptionController,
    SymptomConditionMappingController,
    UsersController
  ],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpErrorFilter},
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_FILTER, useClass: ErrorFilter },
  ],
})
export class AppModule {}
