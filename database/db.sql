CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40),
    cedula INT,
    edad SMALLINT
);

CREATE TABLE creditcards (
  ccard_id SERIAL PRIMARY KEY,
  user_id int NOT NULL,
  saldo INT,
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO users (nombre, cedula, edad)
    VALUES ('joe', 11651651,18),
    ('joel', 1168421,19),
    ('joeli', 11651651,20),
    ('joelie', 18616651,21),
    ('joeliel', 46651651,22),
    ('joana', 11548551,23),
    ('camilo', 11861651,24),
    ('jose', 1165651,25);


INSERT INTO creditcards (user_id, saldo)
    VALUES (1,321513),
    (2,3214863),
    (2,32151843),
    (3,3215846),
    (4,69513),
    (4,961513),
    (5,2513),
    (6,2555513),
    (7,89653),
    (8,30000),
    (8,2513),
    (8,2555513);
select * from users;
select * from creditcards;
