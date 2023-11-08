-- Create a database called postgres_test
CREATE DATABASE postgres_test;

-- create table USER with columns id, firstName, lastName, password

CREATE TABLE "USER" (
    id SERIAL NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    userName VARCHAR(50) NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (id)
);

-- create table PRODUCT with columns id, name, price, category

CREATE TABLE PRODUCT (
    id SERIAL NOT NULL,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

-- create table ORDER with columns id, status, user_id

CREATE TABLE "ORDER" (
    id SERIAL NOT NULL,
    status VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES "USER"(id)
);

-- create table ORDER_PRODUCT with columns order_id, product_id, quantity

CREATE TABLE ORDER_PRODUCT (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES "ORDER"(id),
    FOREIGN KEY (product_id) REFERENCES PRODUCT(id)
);
