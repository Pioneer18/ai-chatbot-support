import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    let authServiceMock = {
      generateJwt: jest.fn().mockResolvedValue('fake-jwt-token'),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{provide: AuthService, useValue: authServiceMock}]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should generate a jwt', async () => {
    const result = await controller.login({ firstName: 'Johnny', id: 'test 1' , lastName: 'Apples' });
  
    // Check that generateJwt was called with the expected argument
    expect(service.generateJwt).toHaveBeenCalledWith({ firstName: 'Johnny', id: 'test 1' , lastName: 'Apples' });
  
    // Update the expectation to match the returned object structure
    expect(result).toEqual({ access_token: 'fake-jwt-token' });  // Use toEqual instead of toBe
  });
  
});
