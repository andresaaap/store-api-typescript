# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: 'product/' [GET] 
- Show: 'product/:id' [GET] 
- Create: 'product/' [POST] 
- Make order [token required]

#### Users
- Show [token required]: 'user/:id' [GET]
- Create: 'user/' [POST]
- Authenticate: 'user/authenticate' [POST]

#### Orders
- Index: 'order/' [GET]
- Get orders completed by user [token required]: '/orders/users/:user_id/completed' [GET]
- Get orders active by user [token required]: '/orders/users/:user_id/active' [GET]
- Create order: '/order/' [POST]
- Update order: '/order/:id' [PUT]
- Add product to order: '/order/:id/products' [POST]

## Data Shapes
#### Product
-  id
- name
- price
- category

#### User
- id
- firstName
- lastName
- userName
- password

#### Orders
- id
- id of each product in the order
- user_id
- status of order (active or complete)

#### Order Product
- order id
- product id
- quantity of each product in the order

## Database
#### Product
```
CREATE TABLE PRODUCT (
    id SERIAL NOT NULL,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
```

#### User
```
CREATE TABLE "USER" (
    id SERIAL NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    userName VARCHAR(50) NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (id)
);
```

#### Orders
```
CREATE TABLE "ORDER" (
    id SERIAL NOT NULL,
    status VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES "USER"(id)
);
```

#### Order Product
```
CREATE TABLE ORDER_PRODUCT (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES "ORDER"(id),
    FOREIGN KEY (product_id) REFERENCES PRODUCT(id)
);
```