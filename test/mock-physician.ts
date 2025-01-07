import { Physician } from "src/physicians/physician.entity";
import { MockUser } from "./mock-user";
import { MockAudit } from "./mock-audit";

export const MockPhysician: Physician = {
       id: 2,
        user: MockUser,
        specialization: 'Pediatrics',
        location: 'Denver, CO',
        availability: [''],
        audit: MockAudit
}