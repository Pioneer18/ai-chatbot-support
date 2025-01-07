import { AuditableEntity } from "src/utilities/entities/auditable-entity";

export const MockAudit: AuditableEntity = {
    created_at: new Date('2025-01-01'),
    updated_at: new Date('2025-01-01')
}