import { Body, Controller, Get, InternalServerErrorException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import axios from 'axios';
import { CharacterService } from '../character/character.service';
import Comment from '../entities/comment.entity';
import Episode from '../entities/episode.entity';
import { EpisodeService } from '../episode/episode.service';
import CommentDto from './comment.dto';
import { CommentService } from './comment.service';

@ApiTags('Comments')
@Controller()
export class CommentController {
    constructor(
        private readonly characterService: CharacterService,
        private readonly commentService: CommentService,
        private readonly episodeService: EpisodeService,
      ) {}


    @Post('/episode/:episodeId/comment')
    @ApiCreatedResponse({ description: 'Successfully made a comment'})
    @ApiNotFoundResponse({ description: 'Not found'})
    async createComment(
      @Param('episodeId', ParseIntPipe) episodeId: number,
      @Body() body: CommentDto
    ): Promise<Comment>{
      try {
      const episode = await this.episodeService.getEpisode( episodeId);
      const { comment } = body;
  
      const { data } = await axios.get('https://api.ipify.org/?format=json');
      const ipAddressLocation = data.ip
      
      return await this.commentService.createComment(
        episode,
        ipAddressLocation,
        comment,
      );
      } catch (error) {
        throw new InternalServerErrorException(`Error making a comment: ${error.message}`);
      }
    }

    @Get('/episode/:episodeId/comments')
    @ApiOkResponse({ description: 'Comments have been successfully retrieved'})
    @ApiNotFoundResponse({ description: 'Not found'})
  async getComments(
    @Param('episodeId', ParseIntPipe) episodeId: number
  ): Promise<Episode> {
    try {
      return await this.episodeService.getEpisode( episodeId);  
    } catch (error) {
      throw new InternalServerErrorException(`Error getting comments: ${error.message}`);
    }
  }
}
