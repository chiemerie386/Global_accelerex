import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { CharacterService } from '../src/character/character.service';
import Character from '../src/entities/character.entity';
import configuration from '../configuration';
import entities from '../src/entities';
import { CreateLocationDto } from '../src/location/location.dto';
import CharacterDto from '../src/character/character.dto';
import { Gender, Status } from '../src/enum/index.enum';
import { CreateEpisodeDto } from '../src/episode/episode.dto';
import CommentDto from '../src/comment/comment.dto';
import { EpisodeModule } from '../src/episode/episode.module';
import { CharacterModule } from '../src/character/character.module';
import { CommentModule } from '../src/comment/comment.module';
import { LocationModule } from '../src/location/location.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let characterService: CharacterService;
  let characterRepository: Repository<Character>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({
        load: [configuration],
      }),EpisodeModule,  CharacterModule,  CommentModule, LocationModule ,TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [...entities],
        synchronize: true,
      })]
    }).compile();

    characterService = moduleFixture.get<CharacterService>(CharacterService)
    characterRepository = moduleFixture.get<Repository<Character>>(getRepositoryToken(Character));
    
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await getConnection().synchronize(true);
    await app.close();
  });

  let locationId: number;
  let characterId: number;
  let episodeId: number;

  describe('POST /location', () => {
    describe('when calling the endpoint', () => {
      const location:CreateLocationDto = {
        "name": "Ondo",
        "longitude": 2.878926,
        "latitude": 6.822807
      }
      it('should make a request to create location (POST)', async () => {
        const result = await request(app.getHttpServer())
          .post('/location')
          .send(location)
          .expect(201)
          expect(result.body).toHaveProperty('id');
          locationId = result.body['id'];
      });
    });
  });

  describe('GET /location', () => {
    describe('when calling the endpoint', () => {
      it('should make a request to get characters (GET)', async () => {
        const result = await request(app.getHttpServer())
          .get('/location')
          .expect(200)
          expect(result.body.length).toBe(1)
      });
    });
  });

  describe('POST /:locationId/character', () => {
    describe('when calling the endpoint', () => {
      const character: CharacterDto = {
        "firstName": "Seunayo",
        "lastName": "Eyiyemi",
        "status": Status.ACTIVE,
        "gender": Gender.FEMALE
      }
      it('should make a request to create a character (POST)', async () => {
        const result = await request(app.getHttpServer())
          .post(`/${locationId}/character`)
          .send(character)
          .expect(201)
          expect(result.body).toHaveProperty('id')
          characterId = result.body['id']
      });
    });
  });

  describe('POST /:characterId/episode', () => {
    describe('when calling the endpoint', () => {
      const episode: CreateEpisodeDto = {
        "name": "oloriebi",
        "episodeCode": "oloriebi11",
        "releaseDate": new Date(), 
      }
      it('should make a request to create an episode (POST)', async () => {
        const result = await request(app.getHttpServer())
          .post(`/${characterId}/episode`)
          .send(episode)
          .expect(201)
          expect(result.body).toHaveProperty('id')
          episodeId = result.body['id'];
          
      });
    });
  });
  
  describe('GET /episodes', () => {
    describe('when calling the endpoint', () => {
      it('should make a request to get episodes (GET)', async () => {
        const result = await request(app.getHttpServer())
          .get('/episodes')
          .expect(200)
          expect(result.body.length).toBe(1)
      });
    });
  });

  describe('POST/episode/:episodeId/comment', () => {
    describe('when calling the endpoint', () => {
      const comment: CommentDto = {
        "comment": "My firsset comment"
      }
      it('should make a request to make a comment on an episode (POST)', async () => {
        
        const result = await request(app.getHttpServer())
          .post(`/episode/${episodeId}/comment`)
          .send(comment)
          .expect(201)
          expect(result.body).toHaveProperty('id');
          
      });
    });
  });

  
  describe('GET /episode/:episodeId/comments', () => {
    describe('when calling the endpoint', () => {
      it('should make a request to get comments on an episode (GET)', async () => {
        const result = await request(app.getHttpServer())
          .get(`/episode/${episodeId}/comments`)
          .expect(200)
          expect(result.body).toHaveProperty('id');
      });
    });
  });
});
