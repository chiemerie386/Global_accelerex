import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import Episode from 'src/entities/episode.entity';
import Location from 'src/entities/location.entity';
import { Gender, Status } from '../enum/index.enum';

export default class CharacterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Character first name'
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Character last name'
  })
  lastName: string;

  @IsString()
  @IsEnum(Status)
  @ApiProperty({
    enum: Status,
    description: 'Character status'
  })
  status: Status;

  @IsString()
  @IsEnum(Gender)
  @ApiProperty({
    enum: Gender,
    description: 'Character gender'
  })
  gender: Gender;



}
