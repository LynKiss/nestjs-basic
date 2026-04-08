import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('login', () => {
    it('should return login response', () => {
      expect(appController.handleLogin({ user: 'Lyn' })).toEqual('Lyn');
    });
  });
});
