/* Replace with your SQL commands */

CREATE TABLE PRODUCT (
    id SERIAL NOT NULL,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);