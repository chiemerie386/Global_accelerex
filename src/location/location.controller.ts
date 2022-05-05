import { Body, Controller, Get, InternalServerErrorException, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CharacterService } from 'src/character/character.service';
import Location from 'src/entities/location.entity';
import { CreateLocationDto } from './location.dto';
import { LocationService } from './location.service';

@ApiTags('Location')
@Controller()
export class LocationController {

    constructor(
        private readonly locationService: LocationService,
      ) {}


      @Post('/location')
      @ApiCreatedResponse({ description: 'Successfully created a location' })
      @ApiNotFoundResponse({ description: 'Not found' })
      async createLocation(@Body() body: CreateLocationDto): Promise<Location> {
        try {
          const { name, longitude, latitude } = body;
          return await this.locationService.createLocation(name, longitude, latitude);
        } catch (error) {
          throw new InternalServerErrorException(`Error creating a location: ${error.message}`);
        }
      }

      @Get('/location')
      @ApiOkResponse({ description: 'Locations have been successfully retrieved' })
      @ApiNotFoundResponse({ description: 'Not found' })
        async getLocations(): Promise<Location[]> {
            try {
            return await this.locationService.getLocations();
            } catch (error) {
            throw new InternalServerErrorException(`Error getting locations: ${error.message}`);
            }
        }
}
