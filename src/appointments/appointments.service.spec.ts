import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsService } from './appointments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { Repository } from 'typeorm';
import { MockPhysician } from '../../test/mock-physician';
import { MockAudit } from '../../test/mock-audit';
import { MockPatient } from '../../test/mock-patient';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let repository: Repository<Appointment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        {
          provide: getRepositoryToken(Appointment),
          useClass: Repository,  // Mock the Repository class
        },
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
    repository = module.get<Repository<Appointment>>(getRepositoryToken(Appointment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of appointments', async () => {
      const result: Appointment[] = [
        { id: 1,
          physician: MockPhysician,
          scheduled_time: new Date('2025-01-01'),
          status: 'Pending',  
          patient: MockPatient,
          audit: MockAudit },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(result);  // Mock the find method

      const appointments = await service.findAll();
      expect(appointments).toEqual(result);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single appointment by id', async () => {
      const result: Appointment = { 
        id: 1, 
        scheduled_time: new Date('2025-01-01'), 
        status: 'Pending', 
        physician: MockPhysician, 
        patient: MockPatient,
        audit: MockAudit
      };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(result);  // Mock findOneBy method

      const appointment = await service.findOne(1);
      expect(appointment).toEqual(result);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null if no appointment is found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);  // Mock findOneBy method to return null

      const appointment = await service.findOne(1);
      expect(appointment).toBeNull();
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('remove', () => {
    it('should call delete method to remove an appointment by id', async () => {
      const deleteSpy = jest.spyOn(repository, 'delete').mockResolvedValue(undefined);  // Mock delete method

      await service.remove(1);

      expect(deleteSpy).toHaveBeenCalledWith(1);
    });
  });
});
