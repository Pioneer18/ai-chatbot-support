CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL, -- hashed
    reset_password_token TEXT, -- hashed
    reset_password_expires TIMESTAMP,
    role TEXT NOT NULL DEFAULT 'patient',
    profile_pic TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE UNIQUE INDEX idx_users_email ON users(email);
CREATE UNIQUE INDEX idx_users_phone_number ON users(phone_number);


CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date_of_birth DATE NOT NULL,
    gender TEXT NOT NULL,
    height TEXT NOT NULL, 
    insurance_id TEXT NULL,
    -- AuditableEntity fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS physicians (
    id SERIAL PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    specialization TEXT NOT NULL,
    location TEXT NOT NULL,
    availability TEXT[] NOT NULL,
    -- AuditableEntity fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    physician_id INT NOT NULL REFERENCES physicians(id) ON DELETE CASCADE,
    scheduled_time TIMESTAMP NOT NULL,
    status TEXT NOT NULL,
    status TEXT NOT NULL,
    -- AuditableEntity fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS conditions (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    severity_level TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS symptoms (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS symptom_condition_mapping (
    symptom_id INT NOT NULL REFERENCES symptoms(id) ON DELETE CASCADE,
    condition_id INT NOT NULL REFERENCES conditions(id) ON DELETE CASCADE,
    severity_level TEXT,
    recommended_action TEXT,
    PRIMARY KEY (symptom_id, condition_id)
);

CREATE TABLE IF NOT EXISTS prescriptions (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    physician_id INT NOT NULL REFERENCES physicians(id), -- keep prescription for patient even if physician deleted
    medication TEXT NOT NULL,
    dosage TEXT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    remaining_refills INT,
    -- AuditableEntity fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);