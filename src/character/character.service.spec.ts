import { Test, TestingModule } from '@nestjs/testing';
import Character from '../entities/character.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Gender, Status } from '../enum/index.enum';
import Location from '../entities/location.entity';
import { CharacterService } from './character.service';
import CharacterDto from './character.dto';

describe('CharacterRepository', () => {
  let characterService: CharacterService;

  const locationStub: Location = {
    id: 1,
    name: 'Lagos',
    longitude: 2.878926,
    created: new Date(),
    latitude: 6.822807,
    character: null
  };

  const characterStub = {
    id: 1,
    firstName: 'Seunayo',
    lastName: 'Eyiyemi',
    status: Status.ACTIVE,
    gender: Gender.MALE,
    created: new Date(),
    location: {
      id: 1,
      name: 'Lagos',
      longitude: 2.878926,
      created: new Date(),
      latitude: 6.822807,
    },
  };

  const mockCharacterRepository = {
      createQueryBuilder: jest.fn(() => ({
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnValueOnce([characterStub]),
      })),
      create: jest.fn().mockImplementation(dto => dto),
      save: jest.fn().mockImplementation(_character => Promise.resolve(characterStub)),
      findOne: jest.fn().mockResolvedValue(characterStub),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        {
          provide: getRepositoryToken(Character),
          useValue: mockCharacterRepository,
        },
      ],
    }).compile();
    characterService = module.get<CharacterService>(CharacterService);
  });

  it('should be defined', () => {
    expect(characterService).toBeDefined();
  });

  describe('getCharacters', () => {
    describe('when getting characters', () => {
      let characters: Character[];

      beforeEach(async () => {
        characters = await characterService.getCharacters({});
      });

      test('then it should call Character Service', () => {
        expect(mockCharacterRepository.createQueryBuilder).toHaveBeenCalled();
      });
      test('then it should return characters', () => {
        expect(characters).toEqual([characterStub]);
      });
    });
  });

  describe('getCharacter', () => {
    describe('when getting a character', () => {
      let character: Character;

      beforeEach(async () => {
        character = await characterService.getCharacter(characterStub.id);
      });

      test('then it should call Character Service', () => {
        expect(mockCharacterRepository.findOne).toHaveBeenCalled();
      });
      test('then it should return a character', () => {

        
        expect(character).toEqual(characterStub);
      });
    });
  });


  describe('createCharacter', () => {
    describe('when creating a character', () => {
      let character: Character;
      let characterDto: CharacterDto;

      beforeEach(async () => {
        characterDto = {
          firstName: 'Seunayo',
          lastName: 'Eyiyemi',
          status: Status.ACTIVE,
          gender: Gender.MALE,
        };

        character = await characterService.createCharacter(characterDto, locationStub);
      });

      test('then it should call Character Service', () => {
        expect(mockCharacterRepository.create).toHaveBeenCalled();
        expect(mockCharacterRepository.save).toHaveBeenCalled();
      });

      test('then it should return a character', () => {
        expect(character).toHaveProperty('location')
      });
    });
  });
});
