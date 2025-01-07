import { Test, TestingModule } from '@nestjs/testing';
import { PhysicianSymptoms } from './physician-symptoms.entity';
import { PhysicianSymptomsService } from './physician-symptoms.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockSymptom } from '../../test/mock-symptom';
import { MockPhysician } from '../../test/mock-physician';

describe('PhysicianSymptomsService', () => {
  let service: PhysicianSymptomsService;
  let repository: Repository<PhysicianSymptoms>;
  let mockPhysicianSymptoms: PhysicianSymptoms

  beforeEach(async () => {
    // Create a testing module
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhysicianSymptomsService,
        {
          provide: getRepositoryToken(PhysicianSymptoms),
          useClass: Repository,  // Use a mock class for the repository
        },
      ],
    }).compile();

    service = module.get<PhysicianSymptomsService>(PhysicianSymptomsService);
    repository = module.get<Repository<PhysicianSymptoms>>(getRepositoryToken(PhysicianSymptoms));

    // Mocking the Symptom entity
    mockPhysicianSymptoms = {
      id: 3, symptom: MockSymptom, physician: MockPhysician 
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of physician symptoms', async () => {
      const result: PhysicianSymptoms[] = [
        { id: 1, symptom: MockSymptom, physician: MockPhysician},
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(result);  // Mocking the find method

      const symptoms = await service.findAll();
      expect(symptoms).toEqual(result);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single physician symptom by id', async () => {
      const result: PhysicianSymptoms = { id: 1, symptom: MockSymptom, physician: MockPhysician};
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(result);  // Mocking findOneBy method

      const symptom = await service.findOne(1);
      expect(symptom).toEqual(result);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null if no physician symptom is found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);  // Mocking findOneBy method to return null

      const symptom = await service.findOne(1);
      expect(symptom).toBeNull();
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('remove', () => {
    it('should call delete method to remove a physician symptom by id', async () => {
      const deleteSpy = jest.spyOn(repository, 'delete').mockResolvedValue(undefined);  // Mocking delete method

      await service.remove(1);

      expect(deleteSpy).toHaveBeenCalledWith(1);
    });
  });
});
