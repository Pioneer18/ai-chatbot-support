import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService

  beforeEach(async () => {
    const jwtServiceMock = {
      sign: jest.fn().mockResolvedValue('signed-payload')
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, {provide: JwtService, useValue: jwtServiceMock}],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a signed payload', async () => {
    const result = await service.generateJwt({ username: 'test-user', sub: 'user-id'})
    
    expect(jwtService.sign).toHaveBeenCalledWith({ username: 'test-user', sub: 'user-id'})

    expect(result).toBe('signed-payload')
  })
});
