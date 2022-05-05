import { Body, Controller, Get, InternalServerErrorException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CharacterService } from '../character/character.service';
import Episode from '../entities/episode.entity';
import { CreateEpisodeDto } from './episode.dto';
import { EpisodeService } from './episode.service';

@ApiTags('Episode')
@Controller()
export class EpisodeController {
    constructor(
        private readonly characterService: CharacterService,
        private readonly episodeService: EpisodeService,
      ) {}


    
    @Get('/episodes')
    @ApiOkResponse({ description: 'Episodes have been successfully retrieved'})
    @ApiNotFoundResponse({ description: 'Not found'})
    async getEpisodes(): Promise<Episode[]> {
      try {
        return await this.episodeService.getEpisodes();
      } catch (error) {
        throw new InternalServerErrorException(`Error getting episodes: ${error.message}`);
      }
    }

    @Post('/:characterId/episode')
    @ApiCreatedResponse({ description: 'Successfully created an episode'})
    @ApiNotFoundResponse({ description: 'Not found'})
  async createEpisode(
    @Param('characterId', ParseIntPipe) characterId: number,
    @Body() body: CreateEpisodeDto,
  ): Promise<Episode> {
    try {
      const character = await this.characterService.getCharacter(characterId);
      const releaseDate = new Date();
      const { name, episodeCode } = body;
      return await this.episodeService.createEpisode(
        character,
        name,
        episodeCode,
        releaseDate,
      );
    } catch (error) {
      throw new InternalServerErrorException(`Error creating an episode: ${error.message}`);
    }
  }

  @Get('/:characterId/episode')
  @ApiCreatedResponse({ description: 'Successfully fetched list of episodes by a character'})
  @ApiNotFoundResponse({ description: 'Not found'})
  async getEpisode(
    @Param('characterId', ParseIntPipe) characterId: number,
  ) {
    try {
      const character = await this.characterService.getCharacter(characterId);
      return character.episodes
      
    } catch (error) {
      throw new InternalServerErrorException(`Error creating an episode: ${error.message}`);
    }
  }

}
