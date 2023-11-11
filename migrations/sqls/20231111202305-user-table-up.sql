/* Replace with your SQL commands */
CREATE TABLE "USER" (
    id SERIAL NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    userName VARCHAR(50) NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (id)
);