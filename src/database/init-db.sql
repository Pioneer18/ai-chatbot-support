CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        phone_number TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        reset_password_token TEXT,
        reset_password_expires TEXT,
        role TEXT NOT NULL DEFAULT 'patient',
        profile_pic TEXT,
        is_active BOOLEAN NOT NULL DEFAULT TRUE
    );

    CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        user INT UNIQUE NOT NULL,
        date_of_birth TEXT NOT NULL,
        gender TEXT NOT NULL,
        height TEXT NOT NULL, 
        insurance_id TEXT NULL,

        -- AuditableEntity fields
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

