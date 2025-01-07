import { Module } from '@nestjs/common';
import { ConditionsController } from './conditions.controller';
import { ConditionsService } from './conditions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condition } from './condition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Condition])],
  controllers: [ConditionsController],
  providers: [ConditionsService]
})
export class ConditionsModule {}
