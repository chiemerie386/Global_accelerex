import { Module } from '@nestjs/common';
import { EpisodeModule } from './episode/episode.module';
import { CharacterModule } from './character/character.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from './location/location.module';
import config from 'ormconfig';
import { ConfigModule } from '@nestjs/config';
import configuration from 'configuration';


@Module({
  imports: [ ConfigModule.forRoot({
    load: [configuration],
  }), TypeOrmModule.forRoot(config), EpisodeModule,  CharacterModule,  CommentModule, LocationModule ],
})



export class AppModule {}
