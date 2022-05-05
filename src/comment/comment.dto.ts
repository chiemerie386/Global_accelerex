import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import Episode from "src/entities/episode.entity";



export default class CommentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'Comment'
      })
    comment: string;
  }

