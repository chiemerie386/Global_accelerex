import { Test, TestingModule } from '@nestjs/testing';
import Character from '../entities/character.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Gender, Status } from '../enum/index.enum';
import Episode from '../entities/episode.entity';
import { EpisodeService } from './episode.service';
import Comment from '../entities/comment.entity';
import { CreateEpisodeDto } from './episode.dto';


describe('EpisodeRepository', () => {
  let episodeService: EpisodeService;

  const episodeStub: Episode = {
    id: 1,
    name: "oloriebi",
    episodeCode: "oloriebi11",
    releaseDate: new Date(),
    created: new Date(),
    characters: [],
    comments: [],
    commentsCount: 0
};

  const characterStub: Character = {
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
      character: null
    },
    episodes: [episodeStub]
  };

  const mockEpisodeRepository = {
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      loadRelationCountAndMap: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnValueOnce([characterStub]),
    })),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((_character) => Promise.resolve(characterStub)),
    findOne: jest.fn().mockResolvedValue(characterStub),
  };

  const mockCharacterRepository = {
    save: jest
    .fn()
    .mockImplementation((_character) => Promise.resolve(characterStub)),
  };
  const mockCommentRepository = {
    save: jest
    .fn()
    .mockImplementation((_character) => Promise.resolve(characterStub)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EpisodeService,
        {
          provide: getRepositoryToken(Episode),
          useValue: mockEpisodeRepository,
        },
        {
          provide: getRepositoryToken(Character),
          useValue: mockCharacterRepository,
        },
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository,
        },
      ],
    }).compile();
    episodeService = module.get<EpisodeService>(EpisodeService);
  });

  it('should be defined', () => {
    expect(episodeService).toBeDefined();
  });

  describe('getEpisodes', () => {
    describe('when getting episodes', () => {
      let episodes: Episode[];

      beforeEach(async () => {
        episodes = await episodeService.getEpisodes()
      });

      test('then it should call Episode Service', () => {
        expect(mockEpisodeRepository.createQueryBuilder).toHaveBeenCalled();
      });
      test('then it should return episodes', () => {
        expect(episodes).toEqual([characterStub]);
      });
    });
  });

  
  describe('getEpisode', () => {
    describe('when getting an episode', () => {
      let episode: Episode;

      beforeEach(async () => {
        episode = await episodeService.getEpisode(episodeStub.id);
      });

      test('then it should call Episode Service', () => {
        expect(mockEpisodeRepository.findOne).toHaveBeenCalled();
      });
      test('then it should return an episode', () => {
        expect(episode).toEqual(characterStub);
      });
    });
  });

  describe('createEpisode', () => {
    describe('when creating an episode', () => {
      let episode: Episode;
      let episodeDto: CreateEpisodeDto;

      beforeEach(async () => {
        episodeDto = {
            "name": "oloriebi",
            "episodeCode": "oloriebi11",
            releaseDate: new Date(),
        };

        episode = await episodeService.createEpisode(characterStub, episodeDto.name, episodeDto.episodeCode, episodeDto.releaseDate);
      });

      test('then it should call Character Service', () => {
        expect(mockEpisodeRepository.create).toHaveBeenCalled();
        expect(mockEpisodeRepository.save).toHaveBeenCalled();
      });

      test('then it should return a character', () => {
        expect(episode).toHaveProperty('episodes')
      });
    });
  });

});
