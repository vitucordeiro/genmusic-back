import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyControllerTsController } from '../controllers/spotify.controller.ts.controller';

describe('SpotifyControllerTsController', () => {
  let controller: SpotifyControllerTsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpotifyControllerTsController],
    }).compile();

    controller = module.get<SpotifyControllerTsController>(SpotifyControllerTsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
