import { Patient } from "../src/patients/patients.entity";
import { MockUser } from "./mock-user";
import { MockAudit } from "./mock-audit";

export const MockPatient: Patient = {
    id: 3,
    user: MockUser,
    date_of_birth: '04/04/2004',
    gender: 'Female',
    height: '5.4',
    insurance_id: '9723409723',
    audit: MockAudit
}