import { Module } from '@nestjs/common';
import { PhysicianConditionsController } from './physician-conditions.controller';
import { PhysicianConditionsService } from './physician-conditions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicianConditions } from './physician-condition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhysicianConditions])],
  controllers: [PhysicianConditionsController],
  providers: [PhysicianConditionsService]
})
export class PhysicianConditionsModule {}
