import { Module } from '@nestjs/common';
import { SymptomsController } from './symptoms.controller';
import { SymptomsService } from './symptoms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Symptom } from './symptom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Symptom])],
  controllers: [SymptomsController],
  providers: [SymptomsService]
})
export class SymptomsModule {}
