import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import Character from '../entities/character.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationService } from '../location/location.service';
import Location from '../entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Character, Location])],
  providers: [CharacterService, LocationService],
  controllers: [CharacterController]
})
export class CharacterModule {}
