BEGIN TRANSACTION;

-- SQLite
CREATE TABLE IF NOT EXISTS config (
  code TEXT NOT NULL,
  type TEXT NOT NULL,
  value TEXT,
  PRIMARY KEY (code, type)
);

-- Insert Data
INSERT OR IGNORE INTO config (code, type, value)
VALUES 
  ('AC01', 'PRODUCT', '{"rider":"AC01","code":"AC01","displayName":"อ.1","age":{"min":"1m","max":"64y"},"steps":[{"value":50000,"step":50000},{"value":500000,"step":100000}],"sum":{"min":{"1m":{"age":"1m","occGroup":{"1":{"multiplier":1,"value":0,"with":null},"2":{"multiplier":1,"value":0,"with":null},"3":{"multiplier":1,"value":0,"with":null}}}},"max":{"1m":{"age":"1m","occGroup":{"1":{"multiplier":1,"value":1000000,"with":null},"2":{"multiplier":1,"value":1000000,"with":null},"3":{"multiplier":1,"value":1000000,"with":null}}},"5y":{"age":"5y","occGroup":{"1":{"multiplier":1,"value":1000000,"with":["AC02"]},"2":{"multiplier":1,"value":1000000,"with":["AC02"]},"3":{"multiplier":1,"value":1000000,"with":["AC02"]}}},"16y":{"age":"16y","occGroup":{"1":{"multiplier":2,"value":4000000,"with":["AC02"]},"2":{"multiplier":3,"value":8000000,"with":["AC02"]},"3":{"multiplier":6,"value":30000000,"with":["AC02"]}}}}},"requiredPermission":"Normal"}'),
  ('AC01', 'RATE', '{"amtRate":{"0":{"value":"0"},"1":{"value":"200"},"2":{"value":"300"},"3":{"value":"400"}},"pmFact":{"0":{"value":"9"},"1":{"value":"100"},"2":{"value":"52"},"4":{"value":"27"}}}'),
  ('UWB', 'PRODUCT', '{"name":"UWB","display":"ประกันควบการลงทุน UWB","code":"UWB","type":"UL","status":"active","age":{"min":"1m","max":"99y"},"riders":["AC01"],"sum":{"_comment":"mock min and max","min":0,"max":999999999}}'),
  ('UWB', 'RATE', '{"M":{"49y":{"age":"49y","value":8},"90y":{"age":"90y","value":5}},"F":{"49y":{"age":"49y","value":8},"90y":{"age":"90y","value":5}}}');

COMMIT;