import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyServiceTsService } from '../services/spotify.service';

describe('SpotifyServiceTsService', () => {
  let service: SpotifyServiceTsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotifyServiceTsService],
    }).compile();

    service = module.get<SpotifyServiceTsService>(SpotifyServiceTsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
