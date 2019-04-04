DROP DATABASE IF EXISTS qc CASCADE;
CREATE USER IF NOT EXISTS leader;
CREATE DATABASE IF NOT EXISTS qc;
GRANT ALL ON DATABASE qc TO leader;

CREATE TABLE IF NOT EXISTS qc.issues (
  id SERIAL PRIMARY KEY,
  status STRING,
  owner STRING,
  created DATE,
  effort INT,
  completionDate TIMESTAMPTZ,
  title STRING,
  createdAt TIMESTAMPTZ default CURRENT_TIMESTAMP,
  updatedAt TIMESTAMPTZ default CURRENT_TIMESTAMP
);

INSERT INTO qc.issues (status, owner, created, effort, completionDate, title, createdAt, updatedAt) VALUES ('Open','Ravan','2016-08-15',5,NULL,'Error in console when clicking Add', DEFAULT, DEFAULT);
INSERT INTO qc.issues (status, owner, created, effort, completionDate, title, createdAt, updatedAt) VALUES ('Assigned','Eddie','2016-08-16',14,'2016-08-30','Missing botton border on panel', DEFAULT, DEFAULT);