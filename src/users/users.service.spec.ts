import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

describe('UsersService', () => {
  let service: UsersService;
  let jwtService: JwtService

  beforeEach(async () => {
    const jwtServiceMock = {
      sign: jest.fn().mockResolvedValue('signed-payload')
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {provide: JwtService, useValue: jwtServiceMock}],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a signed payload', async () => {
    const result = await service.generateJwt('user-id')
    
    expect(jwtService.sign).toHaveBeenCalledWith({'userId': 'user-id'})

    expect(result).toBe('signed-payload')
  })
});
