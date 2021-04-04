START TRANSACTION;
  CREATE TABLE category (
      id serial PRIMARY KEY,
      name VARCHAR NOT NULL
  );

  INSERT INTO category (name) VALUES ('front-end');

  ALTER TABLE "user" ADD COLUMN categoryId int DEFAULT 1;
  ALTER TABLE "user" ADD CONSTRAINT fk_category FOREIGN KEY (categoryId) REFERENCES category (id);
COMMIT;