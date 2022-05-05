import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import Location from '../entities/location.entity';
import { CreateLocationDto } from './location.dto';
import { LocationService } from './location.service';

describe('LocationRepository', () => {
  let locationService: LocationService;

  const locationStub: Location = {
    id: 1,
    name: 'Lagos',
    longitude: 2.878926,
    created: new Date(),
    latitude: 6.822807,
    character: null,
  };

  const mockLocationRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((_location) => Promise.resolve(locationStub)),
    findOne: jest.fn().mockResolvedValue(locationStub),
    find: jest.fn().mockResolvedValue([locationStub]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: getRepositoryToken(Location),
          useValue: mockLocationRepository,
        },
      ],
    }).compile();
    locationService = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(locationService).toBeDefined();
  });

  describe('createLocation', () => {
    describe('when creating a location', () => {
      let location: Location;
      let locationDto: CreateLocationDto;

      beforeEach(async () => {
        const locationObj = {
          name: 'Lagos',
          longitude: 2.878926,
          latitude: 6.822807,
        };

        location = await locationService.createLocation(
          locationObj.name,
          locationObj.longitude,
          locationObj.latitude,
        );
      });

      test('then it should call Location Service', () => {
        expect(mockLocationRepository.create).toHaveBeenCalled();
        expect(mockLocationRepository.save).toHaveBeenCalled();
      });

      test('then it should return a location', () => {
        expect(location).toEqual(locationStub)
      });
    });
  });

  describe('getLocations', () => {
    describe('when getting locations', () => {
      let locations: Location[];

      beforeEach(async () => {
        locations = await locationService.getLocations()
      });

      test('then it should call Location Service', () => {
        expect(mockLocationRepository.find).toHaveBeenCalled();
      });
      test('then it should return locations', () => {
        expect(locations).toEqual([locationStub]);
      });
    });
  });

  describe('getLocation', () => {
    describe('when getting a location', () => {
      let location: Location;

      beforeEach(async () => {
        location = await locationService.getLocation(locationStub.id)
      });

      test('then it should call Location Service', () => {
        expect(mockLocationRepository.findOne).toHaveBeenCalled();
      });
      test('then it should return a location', () => {
        expect(location).toEqual(locationStub);
      });
    });
  });
});
