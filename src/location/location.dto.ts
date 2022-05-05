import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";


export class CreateLocationDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'Location name'
      })
    name:string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: 'Location longitude'
      })
    latitude:number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: 'Location latitude'
      })
    longitude:number
}