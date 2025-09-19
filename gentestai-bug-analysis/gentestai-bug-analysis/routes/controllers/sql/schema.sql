CREATE TABLE IF NOT EXISTS modules (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS bugs (
  id SERIAL PRIMARY KEY,
  module_id INT REFERENCES modules(id),
  severity VARCHAR(20) CHECK (severity IN ('Critical','High','Medium','Low')),
  status VARCHAR(20) CHECK (status IN ('Open','Closed')) DEFAULT 'Open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS test_runs (
  id SERIAL PRIMARY KEY,
  bug_id INT REFERENCES bugs(id),
  result VARCHAR(20) CHECK (result IN ('Pass','Fail')),
  run_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
