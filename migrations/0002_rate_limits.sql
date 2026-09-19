-- Migration: 0002_rate_limits.sql
-- Description: Rate limiting table tracking HMAC-SHA-256 hashed identifiers for abuse prevention without storing raw IP addresses

CREATE TABLE IF NOT EXISTS submission_rate_limits (
  key_hash TEXT PRIMARY KEY,
  window_started_at TEXT NOT NULL,
  count INTEGER NOT NULL,
  expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_expires_at
ON submission_rate_limits(expires_at);
