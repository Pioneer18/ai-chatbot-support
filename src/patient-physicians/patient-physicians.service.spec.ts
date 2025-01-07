import { Test, TestingModule } from '@nestjs/testing';
import { PatientPhysiciansService } from './patient-physicians.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PatientPhysicians } from './patient-physician.entity';
import { Repository } from 'typeorm';
import { MockPatient } from '../../test/mock-patient';
import { MockPhysician } from '../../test/mock-physician';

describe('PatientPhysiciansService', () => {
  let service: PatientPhysiciansService;
  let repository: Repository<PatientPhysicians>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientPhysiciansService,
        {
          provide: getRepositoryToken(PatientPhysicians),
          useClass: Repository, // Mocking the TypeORM repository
        },
      ],
    }).compile();

    service = module.get<PatientPhysiciansService>(PatientPhysiciansService);
    repository = module.get<Repository<PatientPhysicians>>(
      getRepositoryToken(PatientPhysicians),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of patient physicians', async () => {
      const result: PatientPhysicians[] = [
        { id: 3, patient: MockPatient, physician: MockPhysician } as PatientPhysicians,
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(result);

      const patientPhysicians = await service.findAll();
      expect(patientPhysicians).toEqual(result);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single patient-physician record by id', async () => {
      const result: PatientPhysicians = { id: 3, patient: MockPatient, physician: MockPhysician } as PatientPhysicians;
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(result);

      const patientPhysician = await service.findOne(1);
      expect(patientPhysician).toEqual(result);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null if no patient-physician record is found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      const patientPhysician = await service.findOne(999);
      expect(patientPhysician).toBeNull();
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });

  describe('remove', () => {
    it('should call delete method to remove a patient-physician record by id', async () => {
      const deleteSpy = jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      await service.remove(1);

      expect(deleteSpy).toHaveBeenCalledWith(1);
    });
  });
});
