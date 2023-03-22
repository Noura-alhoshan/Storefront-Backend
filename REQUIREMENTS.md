# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: `products/:id` [Get] -To get prodect by ID
- Show `products/` [Get] -To get all the product
- Create [token required] `products/` [Post] -To create product

#### Users
- Index [token required] `users/:id` [Get] -To get user by ID
- Show [token required] `users/` [Get] -To get all the users
- Create N[token required] `users/` [Post] -To create user

#### Orders
- Show [token required] `orders/` [Get] -To get all the orders in table
- Current Order by user (args: user id)[token required]  `users/:userID` [Get] -To get order by user ID
- Create N[token required] `orders/` [Post] -To create order


## Data Shapes
#### Product
-  id
- name
- price

Table: products( 
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price VARCHAR(50) NOT NULL)

#### User
- id
- firstName
- lastName
- password

Table: users( 
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL)

#### Orders
- id
- userid
- status of order (active or complete)

Table: orders(
id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  userid VARCHAR(50) NOT NULL,
  status VARCHAR(255) NOT NULL,
      CONSTRAINT fk_orders_users
        FOREIGN KEY (userid)
            REFERENCES users(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE)

#### Ordertoproducts
-id
-productid
-orderid
-productquantity

Table: ordertoproducts (
id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  orderid VARCHAR(50) NOT NULL,
  productid VARCHAR(50) NOT NULL,
  productQuantity VARCHAR(255) NOT NULL,
    CONSTRAINT fk_order
        FOREIGN KEY (orderid)
            REFERENCES orders(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    CONSTRAINT fk_products
        FOREIGN KEY (productid)
            REFERENCES products(id)
            ON DELETE CASCADE
            ON  UPDATE CASCADE)
