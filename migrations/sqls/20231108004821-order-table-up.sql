/* Replace with your SQL commands */

CREATE TABLE "ORDER" (
    id SERIAL NOT NULL,
    status VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES "USER"(id)
);