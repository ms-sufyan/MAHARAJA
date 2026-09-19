-- Migration: 0001_contact_submissions.sql
-- Description: Core table for recording contact inquiries with data minimization

CREATE TABLE IF NOT EXISTS contact_submissions (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,

  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,

  service_interest TEXT NOT NULL,
  systems TEXT,
  problem TEXT NOT NULL,

  source_path TEXT NOT NULL,

  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,

  privacy_notice_version TEXT NOT NULL,

  status TEXT NOT NULL DEFAULT 'new'
);

CREATE INDEX IF NOT EXISTS idx_contact_created_at
ON contact_submissions(created_at);

CREATE INDEX IF NOT EXISTS idx_contact_status
ON contact_submissions(status);

CREATE INDEX IF NOT EXISTS idx_contact_email
ON contact_submissions(email);
