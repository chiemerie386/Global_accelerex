import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import Character from "src/entities/character.entity";
import Comment from "src/entities/comment.entity";



export class CreateEpisodeDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'Episode name'
      })
    name:string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'Episode code'
      })
    episodeCode:string

    @Type(() => Date)
    @IsOptional()
    @IsDate()
    @ApiProperty({
        type: Date,
        description: 'Episode release date'
      })
    releaseDate:Date

   
}