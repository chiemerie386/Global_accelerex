
import {
    Body,
    ConflictException,
    Controller,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Query,
  } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import Character from '../entities/character.entity';
import { LocationService } from '../location/location.service';
  import { ParseIntPipe } from '../pipes/parseInt.pipes';
import CharacterDto from './character.dto';
import { CharacterService } from './character.service';
import { SortDto } from './sort.dto';

@Controller()
export class CharacterController {
    constructor(
        private readonly characterService: CharacterService,
        private readonly locationService: LocationService,
      ) {}

    @Get('/characters')
    @ApiOkResponse({ description: 'Returned Hello ! successfully'})
    @ApiNotFoundResponse({ description: 'Not found'})
    async getCharacters(@Query() filterDto: SortDto): Promise<Character[]> {
      try {
        return await this.characterService.getCharacters(filterDto)
      } catch (error) {
        throw new InternalServerErrorException(`Error getting characters: ${error.message}`);
      }
    }

    @Post('/:locationId/character')
    @ApiCreatedResponse({ description: 'Resource list has been successfully created'})
    @ApiNotFoundResponse({ description: 'Not found'})
  async createCharacter(
    @Param('locationId', ParseIntPipe) locationId: number,
    @Body() body: CharacterDto,
  ): Promise<Character> {
    try {
      const location = await this.locationService.getLocation(locationId);
      return await this.characterService.createCharacter(
        body,
        location,
      );
    } catch (error) {
      if(error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('A character can only be at a location')
      } else {
        throw new InternalServerErrorException(`Error creating a character: ${error.message}`);
      }
    }
  }

    @Get('/:characterId/character')
    @ApiOkResponse({ description: 'Resource has been successfully retrieved'})
    @ApiNotFoundResponse({ description: 'Not found'})
  async getCharacter(@Param('characterId', ParseIntPipe) characterId: number): Promise<Character> {
    try {
      return await this.characterService.getCharacter(characterId);
    } catch (error) {
      throw new InternalServerErrorException(`Error getting a character: ${error.message}`);
    }
  }

}
