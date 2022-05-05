import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterService } from '../character/character.service';
import Character from '../entities/character.entity';
import Comment from '../entities/comment.entity';
import Episode from '../entities/episode.entity';
import { EpisodeService } from '../episode/episode.service';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';


@Module({
  imports: [TypeOrmModule.forFeature([Comment, Episode, Character])],
  controllers: [CommentController],
  providers: [CharacterService, EpisodeService, CommentService]
})
export class CommentModule {}
