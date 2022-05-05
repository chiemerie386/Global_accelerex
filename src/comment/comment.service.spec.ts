import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import Comment from '../entities/comment.entity';
import Episode from '../entities/episode.entity';
import CommentDto from './comment.dto';
import { CommentService } from './comment.service';

describe('CommentsRepository', () => {
  let commentService: CommentService;

  const commentStub: Comment = {
     id: 1,
    comment: "My first comment",
    ipAddressLocation: "105.112.189.117",
    created: new Date(),
    episode: null
}

  const episodeStub: Episode = {
    id: 1,
    name: "oloriebi",
    episodeCode: "oloriebi11",
    releaseDate: new Date(),
    created: new Date(),
    characters: null,
    comments: [],
    commentsCount: 0
};

  const mockEpisodeRepository = {
    save: jest.fn().mockImplementation(_episode => Promise.resolve(episodeStub)),
  }

  const mockCommentRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(_comment => Promise.resolve(commentStub)),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository,
        },
        {
            provide: getRepositoryToken(Episode),
            useValue: mockEpisodeRepository,
          },
      ],
    }).compile();
    commentService = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(commentService).toBeDefined();
  });

  describe('createComment', () => {
    describe('when creating a comment', () => {
      let comment: Comment;
      let commentDto: CommentDto;

      beforeEach(async () => {
       commentDto =  {
            comment: "My first comment",
        } 
        const ipAddressLocation = "105.112.189.138"
        comment = await commentService.createComment(episodeStub, ipAddressLocation, commentDto.comment);
      });

      test('then it should call Comments Service', () => {
        expect(mockCommentRepository.create).toHaveBeenCalled();
        expect(mockCommentRepository.save).toHaveBeenCalled();
        expect(mockEpisodeRepository.save).toHaveBeenCalled();
      });
      test('then it should return a comment', () => {
        expect(comment).toEqual(commentStub);
      });
    });
  });
});
