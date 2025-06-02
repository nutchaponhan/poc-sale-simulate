BEGIN TRANSACTION;

-- SQLite
CREATE TABLE IF NOT EXISTS config (
    code TEXT PRIMARY KEY,
    type TEXT,
    value TEXT
  );

-- Insert Data
INSERT OR IGNORE INTO config (code, type, value)
VALUES (
  'AC01',
  'RATE',
  json('"{\n  \"amtRate\": {\n    \"0\": { \"value\": \"0\" },\n    \"1\": { \"value\": \"200\" },\n    \"2\": { \"value\": \"300\" },\n    \"3\": { \"value\": \"400\" }\n  },\n  \"pmFact\": {\n    \"0\": { \"value\": \"9\" },\n    \"1\": { \"value\": \"100\" },\n    \"2\": { \"value\": \"52\" },\n    \"4\": { \"value\": \"27\" }\n  }\n}\n"')
);

COMMIT;