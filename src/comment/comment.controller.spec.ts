import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from '../character/character.service';
import Comment from '../entities/comment.entity';
import { EpisodeService } from '../episode/episode.service';

import { Gender, Status } from '../enum/index.enum';
import { CommentController } from './comment.controller';
import CommentDto from './comment.dto';
import { CommentService } from './comment.service';

describe('CommentController', () => {
  let controller: CommentController;
  let commentService: CommentService;

  const commentStub = {
    id: 1,
    comment: 'My first comment',
    ipAddressLocation: '105.112.189.117',
    created: new Date(),
  };

  const episodeStub = {
    id: 1,
    name: 'oloriebi',
    episodeCode: 'oloriebi11',
    releaseDate: new Date(),
    created: new Date(),
    comments: [],
    commentsCount: 0,
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

  const mockCommentService = {
    getComments: jest.fn().mockResolvedValue([]),
    createComment: jest.fn().mockResolvedValue(commentStub),
  };

  const mockEpisodeService = {
    getEpisodes: jest.fn().mockResolvedValue([episodeStub]),
    getEpisode: jest.fn().mockResolvedValue(episodeStub),
    createEpisode: jest.fn().mockResolvedValue(episodeStub),
  };
  const mockCharacterService = {
    getCharacter: jest.fn().mockResolvedValue(characterStub),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        CommentService,
        {
          provide: CharacterService,
          useValue: mockCharacterService,
        },
        {
          provide: EpisodeService,
          useValue: mockEpisodeService,
        },
      ],
    })
      .overrideProvider(CommentService)
      .useValue(mockCommentService)
      .compile();

    controller = module.get<CommentController>(CommentController);
    commentService = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getComments', () => {
    describe('when getting comments', () => {
      let comments;

      beforeEach(async () => {
        comments = await controller.getComments(1);
      });
      test('then it should return comments on an episode', () => {
        expect(comments).toEqual(episodeStub);
      });
    });
  });

  describe('createComment', () => {
    describe('when creating a comment', () => {
      let comment: Comment;
      let commentDto: CommentDto;

      beforeEach(async () => {
        commentDto = {
          comment: 'My first comment',
        };

        comment = await controller.createComment(1,  commentDto);
      });

      test('then it should call Comment Service', () => {
        expect(commentService.createComment).toHaveBeenCalled();
      });
      test('then it should return a comment', () => {
        expect(comment).toEqual(commentStub);
      });
    });
  });
});
